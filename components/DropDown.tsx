import { useState } from "react";

export type OptionType = {
  label: string;
  value: string;
}

type DropDownProps = {
  options: OptionType[];
  selectedOption: OptionType;
  setSelectedOption: (option: OptionType) => void;
  label: string;
};

const DropDown: React.FC<DropDownProps> = ({ options, selectedOption, setSelectedOption, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="pr-2">{label}</span>
        <button type="button" onClick={() => setOpen(!open)}>
          {selectedOption.label}
        </button>
      </div>

      {open && (
        <div className="origin-top-right absolute
