import React from 'react';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface SearchProps {
  id: string;
  placeholder: string;
  value: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Search: React.FC<SearchProps> = ({
  id,
  placeholder,
  value,
  type = 'text',
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      {...register(id, { required })}
      autoComplete={id}
      className={clsx(
        'w-1/2 h-10 px-4 py-6 bg-neutral-900 text-base placeholder-gray-500 text-gray-200 rounded-lg outline-none focus:shadow-outline',
        errors[id] && 'border-red-500'
      )}
    />
  );
};

export default Search;
