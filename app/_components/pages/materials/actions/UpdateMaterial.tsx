'use client';

import { getMaterialAPI, updateMaterialAPI } from '@/app/_api/materials';
import FormActionMaterial from '@/app/_components/pages/materials/components/FormActionMaterial';
import {
  IFormMaterial,
  IMaterialDetail,
} from '@/app/_components/pages/materials/type';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateMaterial = ({ id }: { id: string }) => {
  const [material, setMaterial] = useState<IMaterialDetail | null>(null);

  // @handle
  const getDetailMaterial = useCallback(async (id: string) => {
    const response = await getMaterialAPI(id);
    const { data } = response;
    setMaterial(data);
  }, []);

  const handleUpdateMaterial = useCallback(
    async (data: IFormMaterial) => {
      console.log(data);
      try {
        if (id) {
          await updateMaterialAPI(id, data);
          toast('🔔 Updated successfully!!');
        }
      } catch (err) {
        toast('Updated fail!!!');
      }
    },
    [id]
  );

  // @effect
  useEffect(() => {
    if (id) getDetailMaterial(id);
  }, [id, getDetailMaterial]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">Update Material</h2>
      <div className="mt-50">
        <FormActionMaterial
          material={material}
          type="update"
          handleAction={handleUpdateMaterial}
        />
      </div>
    </div>
  );
};

export default UpdateMaterial;
