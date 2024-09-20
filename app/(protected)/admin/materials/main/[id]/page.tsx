interface IProps {
  params: {
    id: string;
  };
}

const UpdateMaterialPage = ({ params }: IProps) => {
  console.log(params);
  return <div>hihihhi {params.id}</div>;
};

export default UpdateMaterialPage;
