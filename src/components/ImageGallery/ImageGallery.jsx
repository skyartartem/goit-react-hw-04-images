import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, togleModal }) => {
  // const { id, webformatURL, largeImageURL } = images;
  return (
    <>
      <ul className={css.gallery}>
        <ImageGalleryItem togleModal={togleModal} images={images} />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  togleModal: PropTypes.func.isRequired
};
