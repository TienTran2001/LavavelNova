import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Modal } from '@mui/material';
import COLORS from '../../utils/colors';

interface IProps {
  loading: boolean;
  open: boolean;
  content: string;
  setOpen: (open: boolean) => void;
  handleDelete?: () => void;
}

const ModalDanger = ({
  open,
  setOpen,
  content,
  loading,
  handleDelete = () => {},
}: IProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 bg-white w-full max-w-[400px] min-h-[100px] rounded-[16px] -translate-x-1/2 -translate-y-1/2 py-6 px-4">
        <div className="flex flex-col gap-y-6">
          <p className="font-bold text-18 text-gray/600">Delete</p>
          <p className="font-bold text-14 text-gray/500">{content}</p>
          <div className="flex justify-end gap-2 ">
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{
                px: '12px',
                py: '5px',
                borderRadius: 2,
                bgcolor: COLORS.red500,
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'capitalize',
              }}
              onClick={handleDelete}
            >
              Delete
            </LoadingButton>
            <Button
              variant="outlined"
              sx={{
                px: '12px',
                py: '5px',
                borderRadius: 2,
                border: `1px solid ${COLORS.gray300}`,
                fontWeight: 'bold',
                color: COLORS.gray600,
                textTransform: 'capitalize',
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDanger;
