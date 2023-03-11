import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, closeModal }) => {


  useEffect(() => {
    const keyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    // console.log("1");
    window.addEventListener('keydown', keyDown);
    return () => {
      // console.log('2');
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