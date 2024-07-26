import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputForm from '../../../components/Input/InputForm';

import COLORS from '../../../utils/colors';
import SelectForm from '../../../components/Input/SelectForm';
import { priceType } from '../../../utils/constants';
import { addMaterialCategoriesAPI } from '../../../apis/materialCategories';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

interface IFormInput {
  image?: File;
  name?: string;
  price_type?: string;
}

const CreateMaterialCategory = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const handleAddCategory = async (data: {
    image: File;
    name: string;
    price_type: string;
  }) => {
    console.log(data);
    setLoading(true);
    const response = await addMaterialCategoriesAPI(data);
    setLoading(false);
    console.log(response);
    if (response.status === 201) {
      toast('Created successfully!!');
    } else {
      toast('Created fail!!!');
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material Category
      </h2>
      <div className="bg-white rounded-lg shadow-sm max-w-[800px]  mt-[50px]">
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <div className="flex flex-col h-full ">
            <div className="px-8 border-b-[1px] py-5 ">
              <InputForm
                labelClassName="w-1/3"
                type="file"
                containerClassName="flex"
                label="Image*"
                register={register}
                id="image"
                placeholder="Enter name..."
                validate={{
                  required: 'Image is required.',
                }}
                errors={errors}
              />
            </div>
            <div className="px-8 border-b-[1px] py-5 ">
              <InputForm
                labelClassName="w-1/3"
                containerClassName="flex"
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
            <div className="px-8 border-b-[1px]  py-5">
              <SelectForm
                labelClassName="w-1/3"
                containerClassName="flex"
                label="Price type"
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
                }}
                variant="contained"
                type="submit"
              >
                Create
              </LoadingButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
