import axios from '../axios';

export const getMaterialCategoriesAPI = ({ name = '' }) =>
  axios({
    url: `/cms/material_categories?name=${name}&offset=0`,
    method: 'get',
  });
