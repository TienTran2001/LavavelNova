// @react
import { useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

// @mui
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

interface IProps<T extends FieldValues> {
  style?: string;
  containerClassName?: string;
  label?: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  validate?: RegisterOptions<T, Path<T>>;
  labelClassName?: string;
  imageUrl?: string;
  resetImage?: boolean;
}

const InputFile = <T extends FieldValues>({
  resetImage = false,
  containerClassName,
  label,
  id,
  register,
  errors = {},
  validate,
  labelClassName = '',
  imageUrl = '',
}: IProps<T>) => {
  const [filePreview, setFilePreview] = useState<string>(imageUrl || '');
  const [inputKey, setInputKey] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview('');
    }
  };

  const handleDeleteImage = () => {
    setFilePreview('');
    setInputKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (resetImage) {
      handleDeleteImage();
    } else {
      setFilePreview(imageUrl);
    }
  }, [imageUrl, resetImage]);

  return (
    <>
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
            key={inputKey}
            type="file"
            id={id}
            accept=".jpg,.jpeg,.png"
            className="hidden"
            {...register(id, validate)}
            onChange={(e) => {
              handleFileChange(e);
              register(id).onChange(e);
            }}
          />
          {!filePreview ? (
            <label
              htmlFor={id}
              className="w-full cursor-pointer bg-gray/100 rounded-16 min-h-[200px] flex items-center justify-center"
            >
              <>
                <div className="flex flex-col items-center justify-center p-6 gap-y-2">
                  <span className="text-gray-400 ">
                    <CloudUploadIcon sx={{ fontSize: '40px' }} />
                  </span>
                  <small className="italic text-gray-500">
                    Allowed *.jpeg, *.png, *.jpg.
                  </small>
                </div>
              </>
            </label>
          ) : (
            <>
              <div className="">
                <span className="relative">
                  <span
                    className="absolute z-10 cursor-pointer right-2 top-2 "
                    onClick={() => handleDeleteImage()}
                  >
                    <CloseIcon className="opacity-50 text-gray/100" />
                  </span>
                  <img
                    src={filePreview}
                    alt=""
                    className="transition-all rounded-lg vehicle-image"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all bg-black bg-opacity-0 rounded-lg cursor-pointer group hover:bg-opacity-50 "
                    onClick={() => handleOpen()}
                  >
                    <VisibilityIcon className="opacity-0 text-gray/100 group-hover:opacity-50" />
                  </div>
                </span>
              </div>
            </>
          )}

          {errors[id] && (
            <small className="inline-block mt-3 text-red-500">
              {errors[id]?.message?.toString()}
            </small>
          )}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute w-3/4 h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <img
            src={filePreview}
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
      </Modal>
    </>
  );
};

export default InputFile;
