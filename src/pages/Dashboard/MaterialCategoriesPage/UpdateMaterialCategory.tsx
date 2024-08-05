import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getMaterialCategoryAPI,
  updateMaterialCategoryAPI,
} from '../../../apis/materialCategories';
import InputFile from '../../../components/Input/InputFile';
import InputForm from '../../../components/Input/InputForm';
import SelectForm from '../../../components/Input/SelectForm';
import { priceType } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';
import COLORS from '../../../utils/colors';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

interface IFormInput {
  image?: File[];
  name: string;
  price_type: string;
}

const UpdateMaterialCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [data, setData] = useState<IFormInput | null>(null);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

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

  const handleOnSubmit = async (data: IFormInput) => {
    setLoading(true);
    setData(data);
  };

  const handleUpdateCategory = useCallback(
    async (data: IFormInput) => {
      try {
        if (id) {
          await updateMaterialCategoryAPI(id, data);
          setLoading(false);
          toast('🔔 Updated successfully!!');
        }
      } catch (err) {
        setLoading(false);
        toast('Updated fail!!!');
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) getDetailCategory(id);
  }, [id, getDetailCategory]);

  useEffect(() => {
    if (loading) {
      if (data) {
        handleUpdateCategory(data);
      }
    }
  }, [data, handleUpdateCategory, id, loading]);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Update a new Material Category
      </h2>
      <div className="mt-[50px]">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex gap-x-6">
            <div className="w-1/3 ">
              <div className="px-8 py-5 bg-white  shadow-sm rounded-[28px]">
                <InputFile
                  imageUrl={imageUrl}
                  label="Image*"
                  register={register}
                  id="image"
                  validate={
                    {
                      // required: 'Image is required.',
                    }
                  }
                  errors={errors}
                />
              </div>
            </div>
            <div className="w-2/4">
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
                    labelClassName=""
                    containerClassName=""
                    label="Price type*"
                    value=""
                    id="price_type"
                    register={register}
                    control={control}
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
                    Update
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

export default UpdateMaterialCategory;
