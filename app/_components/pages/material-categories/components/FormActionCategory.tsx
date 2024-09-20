'use client';

import { useRouter } from 'next/navigation';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

import { IFormCategory } from '@/app/_components/pages/material-categories/type';
import InputFile from '@/app/_components/ui/input/InputFile';
import InputForm from '@/app/_components/ui/input/InputForm';
import SelectForm from '@/app/_components/ui/input/SelectForm';
import { COLORS } from '@/app/_constants';
import { priceType } from '@/app/_constants/priceType';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

interface IProps {
  handleAction: (data: IFormCategory) => void;
  category?: {
    image: string;
    name: string;
    price_type: string;
  } | null;
  type?: 'create' | 'update';
}

const FormActionCategory = forwardRef(
  ({ category, type = 'create', handleAction }: IProps, ref) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
      control,
    } = useForm<IFormCategory>();

    const [imageUrl, setImageUrl] = useState(''); // preview image
    const [resetImage, setResetImage] = useState(false);

    // @handle
    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
    };

    const handleRequest = useCallback(
      async (data: IFormCategory) => {
        await handleAction(data);
        setLoading(false);
      },
      [handleAction]
    );

    useImperativeHandle(
      ref,
      () => ({
        resetForm: () => {
          reset();
          setResetImage((prev) => !prev);
        },
      }),
      [reset]
    );

    // @effect
    useEffect(() => {
      if (category) {
        setValue('name', category.name);
        setValue('price_type', category.price_type);
        setImageUrl(category.image);
      }
    }, [category, setValue]);

    useEffect(() => {
      if (loading) {
        handleSubmit(handleRequest, () => {
          setLoading(false);
        })();
      }
    }, [handleRequest, handleSubmit, loading]);

    return (
      <div>
        <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => onSubmit(e)}>
          <div className="flex gap-x-6">
            <div className="w-1/3 ">
              <div className="px-8 py-5 bg-white shadow-sm rounded-[28px] ">
                <InputFile
                  resetImage={resetImage}
                  label="Image*"
                  imageUrl={imageUrl}
                  register={register}
                  id="image"
                  validate={
                    type === 'create'
                      ? {
                          required: 'Image is required.',
                        }
                      : {}
                  }
                  errors={errors}
                />
              </div>
            </div>
            <div className="w-2/4 ">
              <div className="flex flex-col bg-white shadow-sm rounded-[28px]">
                <div className="px-8 py-5 ">
                  <InputForm
                    labelClassName=""
                    containerClassName=""
                    label="Name*"
                    register={register}
                    id="name"
                    placeholder="Enter name..."
                    validate={{
                      required: 'Name is required.',
                    }}
                    errors={errors}
                  />
                </div>
                <div className="px-8 py-5">
                  <SelectForm
                    label="Price type*"
                    value=""
                    id="price_type"
                    control={control}
                    register={register}
                    validate={{
                      required: 'Price type not selected.',
                    }}
                    errors={errors}
                  >
                    <MenuItem value={''} disabled>
                      Choose price type
                    </MenuItem>
                    <MenuItem value={priceType.quantity.value}>
                      {priceType.quantity.display}
                    </MenuItem>
                    <MenuItem value={priceType.metter.value}>
                      {priceType.metter.display}
                    </MenuItem>
                  </SelectForm>
                </div>
                <div className="flex justify-end px-8 py-5 gap-x-4">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: COLORS.red500,
                      textTransform: 'revert',
                      borderRadius: '8px',
                    }}
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    loading={loading}
                    sx={{
                      backgroundColor: COLORS.primary500,
                      textTransform: 'revert',
                      borderRadius: '8px',
                    }}
                    variant="contained"
                    type="submit"
                  >
                    {type === 'create' ? 'Create' : 'Update'}
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default FormActionCategory;
