'use client';

import {
  getMaterialCategoryAPI,
  updateMaterialCategoryAPI,
} from '@/app/_api/materialCategories';
import FormActionCategory from '@/app/_components/pages/material-categories/components/FormActionCategory';
import { IFormCategory } from '@/app/_components/pages/material-categories/type';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ICategory {
  image: string;
  name: string;
  price_type: string;
}

const UpdateMaterialCategory = ({ id }: { id: string }) => {
  const [category, setCategory] = useState<ICategory | null>(null);

  // @handle
  const handleUpdateCategory = useCallback(
    async (data: IFormCategory) => {
      try {
        if (id) {
          await updateMaterialCategoryAPI(id, data);
          toast('🔔 Updated successfully!!');
        }
      } catch (err) {
        toast('Updated fail!!!');
      }
    },
    [id]
  );

  const getDetailCategory = useCallback(async (id: string) => {
    const response = await getMaterialCategoryAPI(id);
    const { data } = response;
    setCategory(data);
  }, []);

  // @effect
  useEffect(() => {
    if (id) getDetailCategory(id);
  }, [id, getDetailCategory]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Update a new Material Category
      </h2>
      <div className="mt-50">
        <FormActionCategory
          handleAction={handleUpdateCategory}
          category={category}
          type="update"
        />
      </div>
    </div>
  );
};

export default UpdateMaterialCategory;
