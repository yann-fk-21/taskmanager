import React from 'react';

type SelectInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  options?: Array<{ value: string; label: string }>;
};

const defaultOptions = [
  { value: 'PENDING', label: 'PENDING' },
  { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
  { value: 'COMPLETED', label: 'COMPLETED' },
];

const SelectInput = ({
  value = 'PENDING',
  onChange = () => {},
  label = 'Status',
  options = defaultOptions,
}: SelectInputProps) => {
  return (
    <div className="space-y-2 mb-5">
      <label className="text-sm font-semibold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-gray-600 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
