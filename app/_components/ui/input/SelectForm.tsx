import { COLORS } from '@/app/_constants';
import Select from '@mui/material/Select';
import { ReactNode } from 'react';
import {
  Control,
  Controller,
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
  control: Control<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  validate?: RegisterOptions<T, Path<T>>;
  value?: string;
  children?: ReactNode;
  labelClassName?: string;
}

const SelectForm = <T extends FieldValues>({
  containerClassName,
  label,
  id,
  control,
  register,
  errors = {},
  validate,
  value = '',
  children,
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
        <Controller
          name={id}
          control={control}
          defaultValue={value as never}
          render={({ field: { value } }) => (
            <Select
              id={id}
              value={value}
              defaultValue={value}
              {...register(id, validate)}
              sx={{
                color: COLORS.gray600,
                fontSize: '16px',
                borderRadius: '8px',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                },
              }}
              fullWidth
            >
              {children}
            </Select>
          )}
        />

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
