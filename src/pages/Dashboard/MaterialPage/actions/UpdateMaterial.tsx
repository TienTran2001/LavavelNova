// @react
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// @components
import FormActionMaterial from '~/pages/Dashboard/MaterialPage/components/FormActionMaterial';

// @apis
import { getMaterialAPI, updateMaterialAPI } from '~/apis/materials';

// @type
import {
  IFormMaterial,
  IMaterialDetail,
} from '~/pages/Dashboard/MaterialPage/type';

const UpdateMaterial = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState<IMaterialDetail | null>(null);

  // @handle
  const getDetailMaterial = useCallback(async (id: string) => {
    const response = await getMaterialAPI(id);
    const { data } = response;
    setMaterial(data);
  }, []);

  const handleUpdateMaterial = useCallback(
    async (data: IFormMaterial) => {
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
