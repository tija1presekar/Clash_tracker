'use client';

import ReactSelect from 'react-select';

interface SelectProps {
  label?: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<number, any>[];
  disabled?: boolean;
}

const MultiSelect: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="relative">
      <label
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-neutral-900
        "
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 99,
              pointerEvents: 'auto'
            }),
            control: (base) => ({
              ...base,
              background: 'white',
              borderColor: 'rgb(229, 231, 235)',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'rgb(209, 213, 219)'
              }
            }),
            menu: (base) => ({
              ...base,
              zIndex: 99,
              position: 'absolute',
              pointerEvents: 'auto',
              backgroundColor: 'white',
              width: '100%'
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? 'rgb(243, 244, 246)' : 'white',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgb(243, 244, 246)'
              }
            }),
            container: (base) => ({
              ...base,
              zIndex: 99,
              position: 'relative',
              pointerEvents: 'auto'
            })
          }}
          classNames={{
            control: () => 'text-sm'
          }}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
};

export default MultiSelect;