import axios from '~/axios';

export const getSuppliersAPI = () =>
  axios({
    url: `/cms/supplier `,
    method: 'get',
  });
