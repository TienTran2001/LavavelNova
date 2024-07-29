import { ReactNode } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface IProps<T extends FieldValues> {
  containerClassName?: string;
  label?: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  validate?: RegisterOptions<T, Path<T>>;
  value?: string;
  children?: ReactNode;
  disabled?: boolean;
  labelClassName?: string;
}

const SelectForm = <T extends FieldValues>({
  containerClassName,
  label,
  id,
  register,
  errors = {},
  validate,
  value,
  children,
  disabled,
  labelClassName = '',
}: IProps<T>) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-semibold text-gray/500 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <select
          disabled={disabled ? true : false}
          className="w-full px-3 py-2 placeholder-gray-400 border rounded-md outline-none border-gray/300 text-gray/500 sm:text-sm text-14"
          id={id}
          defaultValue={value}
          {...register(id, validate)}
        >
          {children}
        </select>
        {errors[id] && (
          <small className="inline-block mt-3 text-red-500">
            {errors[id]?.message?.toString()}
          </small>
        )}
      </div>
    </div>
  );
};

export default SelectForm;
