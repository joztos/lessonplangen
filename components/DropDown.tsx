import { useState } from "react";

export type OptionType = {
  label: string;
  value: string;
}

type DropDownProps = {
  options: OptionType[];
  selectedOption: OptionType;
  setSelectedOption: (option: OptionType) => void;
};

const DropDown: React.FC<DropDownProps> = ({ options, selectedOption, setSelectedOption }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={() => setOpen(!open)} 
        // Rest of the button code...
        >
          {selectedOption.label}
        </button>
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
          // Rest of the div code...
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button key={option.value} onClick={() => setSelectedOption(option)} 
              // Rest of the button code...
              >
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
