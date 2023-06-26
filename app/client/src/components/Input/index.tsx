import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

interface InputProps<T extends FieldValues> {
    label?: string;
    placeholder?: string;
    name: Path<T>;
    register?: UseFormRegister<T>;
    error?: string;
    type?: "text" | "password" | "email";
    icons?: React.ReactNode;
    passwordIcon?: boolean;
    uppercase?: boolean;
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
                    {...register && register(name)}
                    defaultValue={""}
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
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};

export const Select = <T extends FieldValues>({
    options,
    name,
    placeholder,
}: {
    // generic options type
    options: Array<{ id: string; name: string }> | undefined;
    name: Path<T>;
    placeholder?: string;
}) => {
    return options ? (
        <select className="select select-bordered w-full max-w-xs" name={name}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option, i) => (
                <option key={i} value={option.id}>{option.name}</option>
            ))}
        </select>
    ) : null
}