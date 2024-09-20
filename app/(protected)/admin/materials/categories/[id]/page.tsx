import UpdateMaterialCategory from '@/app/_components/pages/material-categories/actions/UpdateMaterialCategory';

interface IProps {
  params: {
    id: string;
  };
}

const UpdateMaterialCategoriesPage = ({ params }: IProps) => {
  return <UpdateMaterialCategory id={params.id} />;
};

export default UpdateMaterialCategoriesPage;
