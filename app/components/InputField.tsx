import { ChangeEvent } from 'react';
import { Info } from 'lucide-react';

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
      <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
        {label}
        <span className="ml-1 text-slate-400 cursor-pointer">
          <Info size={14} />
        </span>
      </label>
      <div className="relative rounded-md">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 sm:text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          step={step}
          className={`w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
          aria-label={label}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 sm:text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
} 