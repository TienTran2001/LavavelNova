// @react
import { forwardRef, useImperativeHandle, useState } from 'react';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

// @utils
import COLORS from '~/utils/colors';

interface IProps {
  content: string;
  handleDelete?: () => void;
}

const ModalDanger = forwardRef(
  ({ content, handleDelete = () => {} }: IProps, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setLoading(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        end: handleClose,
        start: () => setLoading(true),
        loading: (value: boolean) => setLoading(value),
      }),
      []
    );

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 bg-white w-full max-w-[400px] min-h-[100px] rounded-16 -translate-x-1/2 -translate-y-1/2 py-6 px-4">
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
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ModalDanger;
