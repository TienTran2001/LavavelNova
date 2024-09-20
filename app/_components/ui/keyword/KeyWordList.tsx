'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
} from 'react-hook-form';

import KeyWordItem from '@/app/_components/ui/keyword/KeyWordItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface IKeyword {
  name: string;
  label: string;
  query: string;
}

interface KeyWordListProps<T extends FieldValues> {
  keywordList: IKeyword[];
  getValues: UseFormGetValues<T>;
  reset: UseFormReset<T>;
  resetField: UseFormResetField<T>;
  resetValues: T;
}

export default function KeyWordList<T extends FieldValues>({
  keywordList,
  getValues,
  reset,
  resetField,
  resetValues,
}: KeyWordListProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDelete = (queryName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(queryName);
    router.push(`${location.pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      {keywordList.map((item: IKeyword) => {
        const value = getValues(item.name as Path<T>);
        if (value) {
          return (
            <KeyWordItem
              key={item.name}
              label={item.label}
              keyword={value}
              onDelete={() => {
                handleDelete(item.query);
                resetField(item.name as Path<T>, { defaultValue: '' as any });
              }}
            />
          );
        }
        return null;
      })}

      <Button
        color="error"
        sx={{
          borderRadius: 2,
          textTransform: 'capitalize',
          height: 35,
          '&:hover': {
            backgroundColor: '#d32f2f1a',
          },
        }}
        startIcon={<DeleteIcon />}
        onClick={() => {
          reset(resetValues);
          router.push(location.pathname);
        }}
      >
        <span className="translate-y-[2px] font-700">Clear</span>
      </Button>
    </Box>
  );
}
