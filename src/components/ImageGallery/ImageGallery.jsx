import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import getImages from 'services_API/Pixabay_API';

export default class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: 0,
    error: null,
    loading: false,
  };
  static propTypes = {
    page: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  };
  getSnapshotBeforeUpdate() {
    const windowHeight = window.innerHeight - 440;
    return windowHeight;
  }
  componentDidUpdate = async (prevProps, _, snapshot) => {
    const { searchValue, page } = this.props;

    if (prevProps.searchValue !== searchValue || prevProps.page !== page) {
      this.setState({ loading: true });
      try {
        const { hits, totalHits } = await getImages(searchValue, page);

        if (!hits.length) {
          this.setState({ images: [] });
          return toast.error('No images found for your request');
        }

        if (prevProps.searchValue !== searchValue) {
          return this.setState({
            totalHits,
            images: hits,
          });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch (error) {
        this.setState({ error, images: [] });
      } finally {
        this.setState({ loading: false });
      }
    }
    if (page > 1) {
      window.scrollBy({
        top: snapshot,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { images, loading, error, totalHits } = this.state;

    return (
      <>
        {error &&
          toast.error('Something went wrong! Please, try again in few minutes')}
        {images.length > 0 && (
          <>
            <Gallery>
              {images.map(({ webformatURL, tags, largeImageURL }, index) => (
                <ImageGalleryItem
                  key={index}
                  standartImg={webformatURL}
                  alt={tags}
                  largeImg={largeImageURL}
                />
              ))}
            </Gallery>
            {loading && <Loader />}
            {totalHits > images.length && !loading && (
              <LoadMoreButton onLoadMore={this.props.onLoadMore} />
            )}
          </>
        )}
      </>
    );
  }
}
