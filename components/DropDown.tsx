import React from "react";

interface DropDownProps {
  label: string;
  selectedOption: string;
  options: string[];
  onSelectOption: (option: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  selectedOption,
  options,
  onSelectOption,
}) => {
  const handleOptionSelect = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div>
      <h2>{label}</h2>
      <select
        value={selectedOption}
        onChange={(e) => handleOptionSelect(e.target.value)}
      >
        <option value="">Seleccionar opción</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
