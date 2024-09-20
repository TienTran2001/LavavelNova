'use client';

import { getAllMaterialCategoriesAPI } from '@/app/_api/materialCategories';
import { getSuppliersAPI } from '@/app/_api/supplier';
import {
  IFormMaterial,
  IMaterialDetail,
} from '@/app/_components/pages/materials/type';
import InputFile from '@/app/_components/ui/input/InputFile';
import InputForm from '@/app/_components/ui/input/InputForm';
import SelectForm from '@/app/_components/ui/input/SelectForm';
import { COLORS } from '@/app/_constants';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

interface ISuppliers {
  id: string;
  name: string;
}

interface ICategory {
  id: string;
  image: string;
  name: string;
  price_type: string;
}

export interface WithListMCSProps {
  categories: ICategory[];
  suppliers: ISuppliers[];
}

interface IProps {
  handleAction: (data: IFormMaterial) => void;
  material?: IMaterialDetail | null;
  type?: 'create' | 'update';
}

const FormActionMaterial = forwardRef(
  (
    {
      material,
      type = 'create',
      handleAction,
    }: // categories,
    // suppliers,
    IProps,
    ref
  ) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
      control,
    } = useForm<IFormMaterial>();

    const [imageUrl, setImageUrl] = useState(''); // image preview
    const [resetImage, setResetImage] = useState(false);

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);

    // @fetch
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliersAPI();
        setSuppliers(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllMaterialCategoriesAPI();
        setCategories(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    // @handle
    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
    };

    const handleRequest = useCallback(
      async (data: IFormMaterial) => {
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

    useEffect(() => {
      if (type === 'update' && material) {
        setImageUrl(material.image);
        setValue('part_number', material.part_number.toString());
        setValue('name', material.name);
        setValue('type', material.type);
        setValue('large_title', material.large_title);
        setValue('small_title', material.small_title);
        setValue('basic_price', material.basic_price);
        setValue('category', material.category);
        setValue('supplier', material.supplier);
      }
    }, [material, setValue, type]);

    useEffect(() => {
      if (loading) {
        handleSubmit(handleRequest, () => {
          setLoading(false);
        })();
      }
    }, [handleRequest, handleSubmit, loading]);

    useEffect(() => {
      fetchCategories();
      fetchSuppliers();
    }, []);

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
            <div className="w-3/4 ">
              <div className="flex flex-col bg-white shadow-sm rounded-[28px]">
                <div className="flex gap-4 px-8 py-6 ">
                  <div className="w-full">
                    <InputForm
                      label="Part number*"
                      register={register}
                      id="part_number"
                      placeholder="HSC0424PP"
                      validate={{
                        required: 'Part number is required.',
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="w-full">
                    <InputForm
                      label="Name"
                      register={register}
                      id="name"
                      placeholder="Enter name..."
                      validate={{}}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex gap-4 px-8 py-6 ">
                  <div className="w-full">
                    <InputForm
                      labelClassName=""
                      containerClassName=""
                      label="Type"
                      type="number"
                      register={register}
                      id="type"
                      placeholder="Enter type..."
                      validate={{}}
                      errors={errors}
                    />
                  </div>
                  <div className="w-full">
                    <InputForm
                      labelClassName=""
                      containerClassName=""
                      label="Large title*"
                      register={register}
                      id="large_title"
                      placeholder="Enter large title..."
                      validate={{
                        required: 'Large title is required.',
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex gap-4 px-8 py-6 ">
                  <div className="w-full">
                    <InputForm
                      labelClassName=""
                      containerClassName=""
                      label="Small title*"
                      register={register}
                      id="small_title"
                      placeholder="Enter small title..."
                      validate={{
                        required: 'Small title is required.',
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="w-full">
                    <InputForm
                      labelClassName=""
                      containerClassName=""
                      type="number"
                      min={1}
                      label="Basic price*"
                      register={register}
                      id="basic_price"
                      placeholder="Enter basic price title..."
                      validate={{
                        required: 'Basic price is required.',
                      }}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="flex gap-4 px-8 py-6 ">
                  <div className="w-full">
                    <SelectForm
                      label="Category*"
                      value=""
                      id="category"
                      control={control}
                      register={register}
                      validate={{
                        required: 'Category not selected.',
                      }}
                      errors={errors}
                    >
                      <MenuItem value={''} disabled>
                        Choose category
                      </MenuItem>
                      {categories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </SelectForm>
                  </div>
                  <div className="w-full">
                    <SelectForm
                      label="Supplier*"
                      value=""
                      id="supplier"
                      control={control}
                      register={register}
                      validate={{
                        required: 'Supplier not selected.',
                      }}
                      errors={errors}
                    >
                      <MenuItem value={''} disabled>
                        Choose supplier
                      </MenuItem>
                      {suppliers.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </SelectForm>
                  </div>
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

// const CSFormActionMaterial = withMaterialsAndSuppliers(FormActionMaterial);
export default FormActionMaterial;
