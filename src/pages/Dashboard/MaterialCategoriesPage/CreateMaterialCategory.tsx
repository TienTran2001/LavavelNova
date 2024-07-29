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

interface IFormInput {
  image: File[];
  name: string;
  price_type: string;
}

const CreateMaterialCategory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormInput | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();

  const handleOnSubmit = async (data: IFormInput) => {
    setLoading(true);
    setData(data);
  };

  useEffect(() => {
    if (loading) {
      const handleAddCategory = async (data: IFormInput) => {
        const response = await addMaterialCategoriesAPI(data);
        setLoading(false);
        console.log(response);
        if (response.status === 201) {
          toast('🔔 Created successfully!!');
          reset({
            name: '',
            price_type: '',
          });
        } else {
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
              <div className="px-8 py-5 bg-white shadow-sm rounded-16 ">
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
            <div className="flex flex-col flex-1 bg-white shadow-sm rounded-16">
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
                  validate={{
                    required: 'Price type not selected.',
                  }}
                  errors={errors}
                >
                  <option value="" className="!py-2" disabled>
                    Choose price type
                  </option>
                  <option value={priceType.quantity.value}>
                    {priceType.quantity.display}
                  </option>
                  <option value={priceType.metter.value}>
                    {priceType.metter.display}
                  </option>
                </SelectForm>
              </div>
              <div className="flex justify-end px-8 py-5">
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
        </form>
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
