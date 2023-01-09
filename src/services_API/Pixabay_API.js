import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});
const API_KEY = '31405972-7c23c7be60e1289f27e0f1942';
async function getImages(value, page) {
  const { data } = await instance.get(
    `?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`
  );
  return data;
}
export default getImages;
