import { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'text' | 'number';
  prefix?: string;
  suffix?: string;
  step?: number;
}

export default function InputField({
  label,
  value,
  onChange,
  type = 'number',
  prefix,
  suffix,
  step = 1,
}: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.valueAsNumber || 0;
    onChange(numValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {prefix && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 sm:text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          step={step}
          className={`w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''}`}
          aria-label={label}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 sm:text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
} 