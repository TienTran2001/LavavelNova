// @react
import { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

// @apis
import { createMaterialAPI } from '~/apis/materials';

// @components
import FormActionMaterial from '~/pages/Dashboard/MaterialPage/components/FormActionMaterial';

// @types
import { IFormMaterial } from '~/pages/Dashboard/MaterialPage/type';

const CreateMaterial = () => {
  // @ref
  const actionFormRef = useRef<{ resetForm: () => void }>(null);
  console.log(actionFormRef);

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
