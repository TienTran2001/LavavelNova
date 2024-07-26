import { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface IProps {
  style?: string;
  containerClassName?: string;
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  min?: number;
  errors?: FieldErrors;
  inputClassName?: string;
  validate?: RegisterOptions;
  value?: string;
  readOnly?: boolean;
  onClick?: () => void;
  labelClassName?: string;
}

const InputForm = ({
  style = 'form-input',
  containerClassName,
  label,
  id,
  type = 'text',
  placeholder = '',
  register,
  min,
  errors = {},
  inputClassName,
  validate,
  value,
  readOnly = false,
  onClick,
  labelClassName = '',
}: IProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-semibold text-gray/500  ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <input
          onClick={onClick}
          type={type}
          id={id}
          readOnly={readOnly}
          value={value}
          min={min}
          placeholder={placeholder}
          className={`${style}  border border-gray/300 text-gray/500 placeholder-gray-400  sm:text-sm rounded-md block w-full py-2 px-3 text-14 outline-none ${inputClassName}`}
          {...register(id, validate)}
          onChange={(e) => {
            handleFileChange(e);
            register(id).onChange(e); // Keep the original onChange
          }}
        />
        {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            className="object-cover w-20 h-20 mt-2"
          />
        )}
        {errors[id] && (
          <small className="inline-block mt-3 text-red-500">
            {errors[id]?.message?.toString()}
          </small>
        )}
      </div>
    </div>
  );
};

export default InputForm;
