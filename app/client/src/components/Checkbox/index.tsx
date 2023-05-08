import React from 'react';

interface CheckboxProps {
    title: string;
    checked: boolean;
    handleChange: (checked: boolean) => void;
}

const Checkbox = ({ title, checked, handleChange }: CheckboxProps) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        handleChange(event.target.checked);
    };

    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">{title}</span>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                />
            </label>
        </div>
    );
}

export default Checkbox;
