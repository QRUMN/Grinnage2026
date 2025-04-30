import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, type, showPasswordToggle, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(props.value || '');

    const formatPhoneNumber = (input: string) => {
      const numbers = input.replace(/\D/g, '');
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      
      if (type === 'tel') {
        newValue = formatPhoneNumber(newValue);
      }
      
      setValue(newValue);
      
      if (onChange) {
        e.target.value = newValue;
        onChange(e);
      }
    };

    const inputType = showPassword ? 'text' : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={handleChange}
            className={cn(
              "block w-full px-4 py-3 rounded-lg",
              "border border-gray-300 dark:border-gray-600",
              "bg-white dark:bg-gray-700",
              "text-gray-900 dark:text-white",
              "placeholder-gray-400 dark:placeholder-gray-400",
              "focus:ring-2 focus:ring-[#56e39f] focus:border-[#56e39f]",
              "shadow-sm transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              type === 'password' && "pr-12",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';