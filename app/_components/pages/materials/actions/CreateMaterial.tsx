'use client';

import { createMaterialAPI } from '@/app/_api/materials';
import FormActionMaterial from '@/app/_components/pages/materials/components/FormActionMaterial';
import { IFormMaterial } from '@/app/_components/pages/materials/type';
import { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

const CreateMaterial = () => {
  // @ref
  const actionFormRef = useRef<{ resetForm: () => void }>(null);

  // @handle
  const handleAddMaterial = useCallback(async (data: IFormMaterial) => {
    try {
      await createMaterialAPI(data);
      actionFormRef.current?.resetForm();
      toast('🔔 Created successfully!!');
    } catch (err) {
      const errorResponse = err as {
        response?: { data?: { part_number?: string[] } };
      };

      if (errorResponse.response?.data?.part_number) {
        toast(`⚠️ ${errorResponse.response.data.part_number[0]}`);
      } else {
        toast('⚠️ Created fail!!!');
      }
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material
      </h2>
      <div className="mt-50">
        <FormActionMaterial
          ref={actionFormRef}
          type="create"
          handleAction={handleAddMaterial}
        />
      </div>
    </div>
  );
};

export default CreateMaterial;
