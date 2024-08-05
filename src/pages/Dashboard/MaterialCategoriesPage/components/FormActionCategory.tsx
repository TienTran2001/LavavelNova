import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputFile from '../../../../components/Input/InputFile';
import InputForm from '../../../../components/Input/InputForm';
import SelectForm from '../../../../components/Input/SelectForm';
import { priceType } from '../../../../utils/constants';
import COLORS from '../../../../utils/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getMaterialCategoryAPI } from '../../../../apis/materialCategories';

export interface IFormInput {
  image?: File[];
  name: string;
  price_type: string;
}

interface IProps {
  loading: boolean;
  type?: 'create' | 'update';
  handleOnSubmit: (data: IFormInput) => void;
  setFormReset?: (reset: () => void) => void;
}

const FormActionCategory = ({
  loading,
  type = 'create',
  handleOnSubmit,
  setFormReset,
}: IProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm<IFormInput>();
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');

  const getDetailCategory = useCallback(
    async (id: string) => {
      const response = await getMaterialCategoryAPI(id);
      const { data } = response;

      setValue('name', data.name);
      setValue('price_type', data.price_type);
      setImageUrl(data.image);
    },
    [setValue]
  );

  useEffect(() => {
    if (setFormReset) setFormReset(() => reset);
  }, [reset, setFormReset]);

  useEffect(() => {
    if (id) getDetailCategory(id);
  }, [id, getDetailCategory]);
  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex gap-x-6">
          <div className="w-1/3 ">
            <div className="px-8 py-5 bg-white shadow-sm rounded-[28px] ">
              <InputFile
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
                  onClick={() => navigate(-1)}
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
};

export default FormActionCategory;
