import { TextField } from '@mui/material';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import COLORS from '../../utils/colors';

interface IProps<T extends FieldValues> {
  // style?: string;
  containerClassName?: string;
  label?: string;
  id: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  min?: number;
  // inputClassName?: string;
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
        {/* <input
          onClick={onClick}
          type={type}
          id={id}
          readOnly={readOnly}
          value={value}
          min={min}
          placeholder={placeholder}
          className={`${style}  border border-gray/300 text-gray/500 placeholder-gray-400  sm:text-sm rounded-lg block w-full py-2 px-3 text-14 outline-none ${inputClassName}`}
          {...register(id, validate)}
        /> */}
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
          // error={!!errors[id]}
          // helperText={errors[id]?.message?.toString()}
          variant="outlined"
          // className={`${style}  border border-gray/300 text-gray/500 placeholder-gray-400  sm:text-sm rounded-lg block w-full py-2 px-3 text-14 outline-none ${inputClassName}`}
          sx={{
            color: COLORS.gray500,
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
