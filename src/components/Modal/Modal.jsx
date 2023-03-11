import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, closeModal }) => {


  useEffect(() => {
    const keyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    
    window.addEventListener('keydown', keyDown);
    return () => {
      
      window.removeEventListener('keydown', keyDown);
    };
  }, [closeModal]);

  const handleClose = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={handleClose} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};