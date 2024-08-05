import axios from '../axios';

export const getMaterialCategoriesAPI = ({ name = '', offset = 0 }) =>
  axios({
    url: `/cms/material_categories?name=${name}&limit=5&offset=${offset}`,
    method: 'get',
  });

export const addMaterialCategoriesAPI = (data: {
  name: string;
  price_type: string;
  image?: File[];
}) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price_type', data.price_type);

  if (data.image) {
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

export const getMaterialCategoryAPI = (id: string) =>
  axios({
    url: `/cms/material_categories/${id}`,
    method: 'get',
  });

export const updateMaterialCategoryAPI = async (
  id: string,
  data: {
    name: string;
    price_type: string;
    image?: File[];
  }
) => {
  let requestData: FormData | { name: string; price_type: string };

  if (data.image && data.image.length > 0) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price_type', data.price_type);
    formData.append('image', data.image[0]);
    requestData = formData;
  } else {
    requestData = {
      name: data.name,
      price_type: data.price_type,
    };
  }

  return axios({
    url: `/cms/material_categories/${id}`,
    method: 'put',
    data: requestData,
    headers: {
      'Content-Type': data.image ? 'multipart/form-data' : 'application/json',
    },
  });
};
