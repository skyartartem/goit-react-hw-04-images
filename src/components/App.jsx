import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'api/getSearch';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from './Modal/Modal';

export const App =()=> {
  // state = {
  //   search: '',
  //   images: [],
  //   page: 1,
  //   total: 1,
  //   loading: false,
  //   error: null,
  //   showModal: false,
  //   empty: false,
  //   largeImageURL: null, 
  //   alt: null
  // };

  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    console.log("1");
    if (!search) {return}
    getFunc(search, page);
  },[search, page])

  // componentDidUpdate(_, PrevState) {
  //   if (
  //     PrevState.search !== this.state.search ||
  //     PrevState.page !== this.state.page
  //   ) {
  //     this.getFunc(this.state.search, this.state.page);
  //   }
  // }

  const getFunc = (text, page) => {
    setLoading(true);
    getSearch(text, page)
      .then(resp => resp.json())
      .then(data => {
        if (data.hits.length === 0) {
          setEmpty(true);
        }
        setImages(state => [...state, ...data.hits]);
        setTotal(data.total);
        // setState(prevSt => ({
        //   page: prevSt.page,
        //   images: [...prevSt.images, ...data.hits],
        //   total: data.total,
        // }));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clickLoad = () => {
    setPage(state => state+1);
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(state => !state);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    // this.setState(({ showModal }) => {
    //   return { showModal: !showModal, largeImageURL, alt };
    // });
  };

  const handleSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
    setTotal(0);
    setLoading(false);
    setError(null);
    setEmpty(false);
    // this.setState({
    //   search,
    //   images: [],
    //   page: 1,
    //   total: 1,
    //   loading: false,
    //   error: null,
    //   empty: false,
    // });
  };

  const closeModal = () => {
    setShowModal(state=> !state);
  };

    // const { error, loading, images, total, page } = this.state;
    return (
      <div>
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />
        <Searchbar handleSubmit={handleSubmit} />
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Something went wrong: ({error})!
          </h2>
        )}
        <ImageGallery togleModal={openModal} images={images} />
        {loading && <Loader />}
        {empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry. There are no images ... 😭
          </h2>
        )}
        {total / 12 > page && <Button clickLoad={clickLoad} />}
        {showModal && (
          <Modal closeModal={closeModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </div>
    );
  
}
