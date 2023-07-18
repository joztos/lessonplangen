import { useState } from "react";

export type OptionType = {
  label: string;
  value: string;
}

type DropDownProps = {
  options: OptionType[];
  selectedOption: OptionType;
  setSelectedOption: (option: OptionType) => void;
  label: string;  // Añade esta línea
};

const DropDown: React.FC<DropDownProps> = ({ options, selectedOption, setSelectedOption, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{label}</label>  {/* Muestra la etiqueta aquí */}
      <div>
        <button type="button" onClick={() => setOpen(!open)}>
          {selectedOption.label}
        </button>
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button key={option.value} onClick={() => {setSelectedOption(option); setOpen(false);}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
