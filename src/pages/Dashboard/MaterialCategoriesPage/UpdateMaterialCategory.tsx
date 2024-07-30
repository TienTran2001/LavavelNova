import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMaterialCategoryAPI,
  updateMaterialCategoryAPI,
} from '../../../apis/materialCategories';
import InputFile from '../../../components/Input/InputFile';
import InputForm from '../../../components/Input/InputForm';
import SelectForm from '../../../components/Input/SelectForm';
import { priceType, urlToFile } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';
import COLORS from '../../../utils/colors';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IFormInput {
  image: File[];
  name: string;
  price_type: string;
}

const UpdateMaterialCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [data, setData] = useState<IFormInput | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const getDetailCategory = async (id: string) => {
    const response = await getMaterialCategoryAPI(id);
    const { data } = response;

    setValue('name', data.name);
    setValue('price_type', data.price_type);
    setImageUrl(data.image);
  };

  const handleOnSubmit = async (data: IFormInput) => {
    setLoading(true);
    setData(data);
  };

  useEffect(() => {
    if (id) getDetailCategory(id);
  }, []);

  useEffect(() => {
    if (loading) {
      const handleAddCategory = async (data: IFormInput) => {
        if (id) {
          const file = await urlToFile(imageUrl, 'image.jpg');
          data.image = [file];
          const response = await updateMaterialCategoryAPI(id, data);
          setLoading(false);

          if (response.status === 200) {
            toast('🔔 Updated successfully!!');
          } else {
            toast('Updated fail!!!');
          }
        }
      };
      if (data) {
        handleAddCategory(data);
      }
    }
  }, [data, id, loading]);
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
            <div className="flex flex-col w-2/4 bg-white shadow-sm rounded-[28px]">
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
                  Update
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMaterialCategory;
