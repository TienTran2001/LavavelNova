import { TextField } from '@mui/material';
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
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  min?: number;
  validate?: RegisterOptions<T, Path<T>>;
  value?: string;
  readOnly?: boolean;
  onClick?: () => void;
  labelClassName?: string;
}

const InputForm = <T extends FieldValues>({
  containerClassName,
  label,
  id,
  type = 'text',
  placeholder = '',
  register,
  min,
  errors = {},
  validate,
  value,
  readOnly = false,
  onClick,
  labelClassName = '',
}: IProps<T>) => {
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
        <TextField
          onClick={onClick}
          type={type}
          id={id}
          InputProps={{
            readOnly: readOnly,
            inputProps: { min: min },
          }}
          value={value}
          placeholder={placeholder}
          variant="outlined"
          sx={{
            color: 'gray',
            fontSize: '14px',
            padding: 0,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
            ' input': {
              padding: '8px 12px',
            },
          }}
          fullWidth
          {...register(id, validate)}
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

export default InputForm;
