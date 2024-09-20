import { HeadCellCategories } from '@/app/_components/pages/material-categories/type';

export const headCellsCategoriesTable: HeadCellCategories[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'NO',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'price_type',
    numeric: false,
    disablePadding: false,
    label: 'Price type',
  },
  {
    numeric: false,
    disablePadding: false,
    label: '',
  },
];
