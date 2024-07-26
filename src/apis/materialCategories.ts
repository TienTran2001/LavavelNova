import axios from '../axios';

export const getMaterialCategoriesAPI = ({ name = '', offset = 0 }) =>
  axios({
    url: `/cms/material_categories?name=${name}&limit=5&offset=${offset}`,
    method: 'get',
  });

export const addMaterialCategoriesAPI = (data: {
  name: string;
  price_type: string;
  image?: File;
}) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price_type', data.price_type);

  if (data.image && data.image?.length > 0) {
    formData.append('image', data.image[0]);
  }

  return axios({
    url: `/cms/material_categories`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteMaterialCategoryAPI = (id: string) =>
  axios({
    url: `/cms/material_categories/${id}`,
    method: 'delete',
  });
