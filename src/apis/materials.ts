import axios from '~/axios';
import { IFormMaterial } from '~/pages/Dashboard/MaterialPage/type';

export const getMaterialsAPI = ({ name = '', offset = 0 }) =>
  axios({
    url: `/cms/material`,
    method: 'get',
    params: { name, offset: offset, limit: 5, category: '' },
  });

export const createMaterialAPI = (data: IFormMaterial) => {
  const formData = new FormData();

  data.name && formData.append('name', data.name);
  formData.append('part_number', data.part_number);
  data.type && formData.append('type', data.type.toString());
  formData.append('large_title', data.large_title);
  formData.append('small_title', data.small_title);
  formData.append('basic_price', data.basic_price.toString());
  formData.append('category', data.category);
  formData.append('supplier', data.supplier);

  if (data.image) {
    formData.append('image', data.image[0]);
  }

  return axios({
    url: `/cms/material`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteMaterialAPI = (id: string) =>
  axios({
    url: `/cms/material/${id}`,
    method: 'delete',
  });

export const deleteMaterialsAPI = (ids: string[]) =>
  axios({
    url: `/cms/material/bulk/${ids}`,
    method: 'delete',
  });

export const getMaterialAPI = (id: string) =>
  axios({
    url: `/cms/material/${id}`,
    method: 'get',
  });

export const updateMaterialAPI = async (id: string, data: IFormMaterial) => {
  let requestData:
    | FormData
    | {
        large_title: string;
        name?: string;
        type?: number;
        part_number: string;
        basic_price: number;
        small_title: string;
        category: string;
        supplier: string;
      };
  if (data.image && data.image.length > 0) {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    data.name && formData.append('name', data.name);
    formData.append('part_number', data.part_number);
    data.type && formData.append('type', data.type.toString());
    formData.append('large_title', data.large_title);
    formData.append('small_title', data.small_title);
    formData.append('basic_price', data.basic_price.toString());
    formData.append('category', data.category);
    formData.append('supplier', data.supplier);
    requestData = formData;
  } else {
    requestData = {
      part_number: data.part_number,
      name: data.name,
      type: data.type,
      large_title: data.large_title,
      small_title: data.small_title,
      basic_price: data.basic_price,
      category: data.category,
      supplier: data.supplier,
    };
  }

  return axios({
    url: `/cms/material/${id}`,
    method: 'put',
    data: requestData,
    headers: {
      'Content-Type': data.image ? 'multipart/form-data' : 'application/json',
    },
  });
};
