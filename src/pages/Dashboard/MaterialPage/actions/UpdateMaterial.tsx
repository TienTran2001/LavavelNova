// @react
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// @components
import FormActionMaterial from '../components/FormActionMaterial';

// @apis
import { getMaterialAPI, updateMaterialAPI } from '~/apis/materials';

// @type
import { IFormMaterial, IMaterialDetail } from '../type';

const UpdateMaterial = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormMaterial | null>(null);
  const [material, setMaterial] = useState<IMaterialDetail | null>(null);

  const handleOnSubmit = async (data: IFormMaterial) => {
    setLoading(true);
    console.log(data);
    setData(data);
  };

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
          setLoading(false);
          toast('🔔 Updated successfully!!');
        }
      } catch (err) {
        setLoading(false);
        toast('Updated fail!!!');
      }
    },
    [id]
  );

  useEffect(() => {
    if (loading) {
      if (data) {
        handleUpdateMaterial(data);
      }
    }
  }, [data, handleUpdateMaterial, id, loading]);

  useEffect(() => {
    if (id) getDetailMaterial(id);
  }, [id, getDetailMaterial]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">Update Material</h2>
      <div className="mt-[50px]">
        <FormActionMaterial
          material={material}
          loading={loading}
          type="update"
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default UpdateMaterial;
