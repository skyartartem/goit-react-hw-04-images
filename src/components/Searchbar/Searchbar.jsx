import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css'

export const Searchbar = ({ handleSubmit }) => {
  // state = {
  //   search: '',
  // };
  const [search, setSearch] = useState('');

  const onChangeInput = evt => {
    setSearch(evt.currentTarget.value);
  };

  const resetForm = () => {
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          if (!search) {
            return toast.error('Enter text for search.');
          }
          handleSubmit(search);
          resetForm();
        }}
        className={css.Form}
      >
        <button type="submit" className={css.Button}>
          {/* <span className={css.buttonLabel}> */}
          <BiSearch size="20" />
          {/* </span> */}
        </button>

        <input
          value={search}
          onChange={onChangeInput}
          className={css.Input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};