import { COLORS } from '@/app/_constants';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface IProps {
  label: string;
  keyword: string;
  onDelete: () => void;
}

const KeyWordItem = ({ label, keyword, onDelete }: IProps) => {
  return (
    <Box
      sx={{
        border: `1px dashed ${COLORS.gray300}`,
        p: '5px 10px',
        maxWidth: '100%',
        borderRadius: 2,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {label}:
      </Typography>
      <Chip
        label={keyword}
        onDelete={() => onDelete()}
        sx={{
          height: '28px',
          fontWeight: 600,
          overflow: 'hidden',
          borderRadius: 2,
          '& svg': {
            width: 15,
            fill: `${COLORS.gray500}`,
          },
        }}
      />
    </Box>
  );
};

export default KeyWordItem;
