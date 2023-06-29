import React from "react";
import { FieldValues, Path, UseFormRegister, set } from "react-hook-form";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

interface InputProps<T extends FieldValues> {
    label?: string;
    placeholder?: string;
    name: Path<T>;
    register?: UseFormRegister<T>;
    error?: string;
    type?: "text" | "password" | "email" | "number" | "date";
    icons?: React.ReactNode;
    passwordIcon?: boolean;
    uppercase?: boolean;
    defaultV?: string | number;
}

export const Input = <T extends FieldValues>({
    label,
    placeholder = "",
    name,
    register,
    error,
    type = "text",
    icons,
    passwordIcon,
    uppercase,
    defaultV
}: InputProps<T>) => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
        <div className="flex flex-col group space-y-1">
            {label && <label htmlFor={name as string} className="font-bold text-sm tracking-wide">{label}</label>}
            <div className={`rounded-md pr-5 pl-3 py-3 bg-transparent border-gray-400 border flex items-center space-x-2 focus-within:text-blue-500 focus-within:border-blue-500`}>
                {icons}
                <input
                    className={`bg-transparent outline-none w-full text-gray-600 ${uppercase ? "uppercase" : ""}`}
                    type={showPassword ? "text" : type}
                    placeholder={placeholder}
                    {...register && register(name, { valueAsNumber: type === "number" })}
                    defaultValue={defaultV}
                />
                {passwordIcon && (
                    <div
                        className="cursor-pointer group-focus:text-red-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <VscEye />
                        ) : (
                            <VscEyeClosed />
                        )}
                    </div>
                )}
            </div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
};

export const Select = <T extends FieldValues>({
    defaultV,
    options,
    name,
    placeholder,
    register,
    wfull,
    theme = "light"
}: {
    // generic options type
    defaultV?: string | number | undefined;
    options: Array<{ id: string; name: string }> | undefined;
    name: Path<T>;
    placeholder?: string;
    register?: UseFormRegister<T>;
    wfull?: boolean;
    theme?: "dark" | "light";
}) => {
    return options ? (
        <select className={`select select-bordered ${wfull === true && 'w-full'} ${theme === 'light' ? 'bg-white text-gray-400 border border-gray-400' : ''}`} defaultValue={defaultV || ''} name={name} {...register && register(name)}>
            {placeholder && <option value={''}>{placeholder}</option>}
            {options.map((option, i) => (
                <option key={i} value={option.id}>{option.name}</option>
            ))}
        </select>
    ) : null
}

interface AutocompleteProps {
    options: string[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ options, setValue }) => {
    const [inputValue, setInputValue] = React.useState('');
    const [filteredOptions, setFilteredOptions] = React.useState<string[]>([]);
    const [onFocus, setOnFocus] = React.useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setValue(value);
        setOnFocus(true);
        setFilteredOptions(options.filter((option) => option.toLowerCase().includes(value.toLowerCase())));
    };

    const handleOptionClick = (value: string) => {
        setInputValue(value);
        setValue(value);
        setFilteredOptions([]);
    };

    return (
        <div className="relative" onFocus={() => setOnFocus(true)}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Rechercher dans mes cartes..."
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

            />
            {filteredOptions.length > 0 && onFocus && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-sm" onBlur={() => setOnFocus(false)} >
                    {filteredOptions.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
