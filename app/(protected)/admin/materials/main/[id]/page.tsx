import UpdateMaterial from '@/app/_components/pages/materials/actions/UpdateMaterial';

interface IProps {
  params: {
    id: string;
  };
}

const UpdateMaterialPage = ({ params }: IProps) => {
  return <UpdateMaterial id={params.id} />;
};

export default UpdateMaterialPage;
