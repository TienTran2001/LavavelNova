'use client';

import { addMaterialCategoriesAPI } from '@/app/_api/materialCategories';
import FormActionCategory from '@/app/_components/pages/material-categories/components/FormActionCategory';
import { IFormCategory } from '@/app/_components/pages/material-categories/type';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const CreateMaterialCategory = () => {
  // @ref
  const actionFormRef = useRef<{ resetForm: () => void }>(null);

  // @handle
  const handleAddCategory = async (data: IFormCategory) => {
    try {
      await addMaterialCategoriesAPI(data);
      toast('🔔 Created successfully!!');
      actionFormRef.current?.resetForm();
    } catch (err) {
      toast('Created fail!!!');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material Category
      </h2>
      <div className="mt-50">
        <FormActionCategory
          ref={actionFormRef}
          handleAction={handleAddCategory}
          type="create"
        />
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
