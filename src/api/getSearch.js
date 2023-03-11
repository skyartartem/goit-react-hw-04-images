const API_KEY = '32854135-9d23b52454b3142f3a14ae48f';
const BASE_URL = 'https://pixabay.com/api/';

const PICS_ON_PAGE = 12;

export const getSearch = (searchText, page) => {
  return fetch(
     `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PICS_ON_PAGE}`
   )
}