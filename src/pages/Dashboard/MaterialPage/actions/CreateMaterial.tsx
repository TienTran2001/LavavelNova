// @react
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// @apis
import FormActionMaterial from '../components/FormActionMaterial';
import { createMaterialAPI } from '~/apis/materials';

// @components

// @types
import { IFormMaterial } from '../type';

interface IMMaterial {
  data: IFormMaterial;
  loading: boolean;
}

const initialState = {
  data: {
    image: [],
    part_number: '',
    category: '',
    supplier: '',
    small_title: '',
    large_title: '',
    basic_price: 0,
  },
  loading: false,
};

const CreateMaterial = () => {
  const [materials, setMaterials] = useState<IMMaterial>(initialState);
  const [resetForm, setResetForm] = useState<() => void>(() => {});
  const handleOnSubmit = async (
    data: IFormMaterial,
    resetOption?: {
      reset: () => void;
      setResetImage: React.Dispatch<React.SetStateAction<boolean>>;
    }
  ) => {
    if (resetOption) {
      const { reset, setResetImage } = resetOption;
      setResetForm(() => reset); // callback to use reset form
      setResetImage((prev) => !prev); // clear link img
    }
    setMaterials((prev) => ({ ...prev, loading: true, data }));
  };

  const handleAddMaterial = useCallback(
    async (data: IFormMaterial) => {
      try {
        await createMaterialAPI(data);
        setMaterials((prev) => ({ ...prev, loading: false }));
        toast('🔔 Created successfully!!');
        resetForm();
      } catch (err) {
        setMaterials((prev) => ({ ...prev, loading: false }));
        const errorResponse = err as {
          response?: { data?: { part_number?: string[] } };
        };

        if (errorResponse.response?.data?.part_number) {
          toast(`⚠️ ${errorResponse.response.data.part_number[0]}`);
        } else {
          toast('⚠️ Created fail!!!');
        }
      }
    },
    [resetForm]
  );

  useEffect(() => {
    if (materials.loading) {
      if (materials.data) {
        handleAddMaterial(materials.data);
      }
    }
  }, [handleAddMaterial, materials.data, materials.loading]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material
      </h2>
      <div className="mt-[50px]">
        <FormActionMaterial
          loading={materials.loading}
          type="create"
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default CreateMaterial;
