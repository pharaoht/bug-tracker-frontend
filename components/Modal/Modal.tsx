import React, { ReactNode } from 'react';
import { Box, Modal } from '@mui/material'

interface ModalPropTypes {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  border:'none',
  boxShadow: 24,
  backgroundColor:'#fff',
  borderRadius:'20px',
  zIndex:'999',
  '@media (max-width: 600px)': { 
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      textAlign:'center',
      fontSize:'13px'

    },

};

const ContainerModal = ({ children, isOpen, onClose }: ModalPropTypes) => {

  if (!isOpen) {
    return null;
  }



  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          {children}
      </Box>
    </Modal>
  );
};

export default ContainerModal;
