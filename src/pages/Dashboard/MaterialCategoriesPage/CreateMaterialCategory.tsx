import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputForm from '../../../components/Input/InputForm';

import COLORS from '../../../utils/colors';
import SelectForm from '../../../components/Input/SelectForm';
import { priceType } from '../../../utils/constants';
import { addMaterialCategoriesAPI } from '../../../apis/materialCategories';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import InputFile from '../../../components/Input/InputFile';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

interface IFormInput {
  image: File[];
  name: string;
  price_type: string;
}

const CreateMaterialCategory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormInput | null>(null);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IFormInput>();

  const handleOnSubmit = async (data: IFormInput) => {
    setLoading(true);
    setData(data);
  };

  useEffect(() => {
    if (loading) {
      const handleAddCategory = async (data: IFormInput) => {
        try {
          await addMaterialCategoriesAPI(data);
          setLoading(false);
          toast('🔔 Created successfully!!');
          reset({
            name: '',
            price_type: '',
          });
        } catch (err) {
          setLoading(false);
          toast('Created fail!!!');
        }
      };
      if (data) {
        handleAddCategory(data);
      }
    }
  }, [data, loading, reset]);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material Category
      </h2>
      <div className="mt-[50px]">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex gap-x-6">
            <div className="w-1/3 ">
              <div className="px-8 py-5 bg-white shadow-sm rounded-[28px] ">
                <InputFile
                  label="Image*"
                  register={register}
                  id="image"
                  validate={{
                    required: 'Image is required.',
                  }}
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
                    {/* <option value="" className="!py-2" disabled>
                      Choose price type
                    </option>
                    <option value={priceType.quantity.value}>
                      {priceType.quantity.display}
                    </option>
                    <option value={priceType.metter.value}>
                      {priceType.metter.display}
                    </option> */}
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
                    Cancel
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
                    Create
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
