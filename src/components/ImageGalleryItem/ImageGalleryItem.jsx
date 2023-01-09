import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import { PropTypes } from 'prop-types';
export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  static propTypes = {
    standartImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { standartImg, alt, largeImg } = this.props;
    const { showModal } = this.state;
    return (
      <GalleryItem>
        <GalleryImage src={standartImg} alt={alt} onClick={this.toggleModal} />
        {showModal && (
          <Modal largeImage={largeImg} alt={alt} onClose={this.toggleModal} />
        )}
      </GalleryItem>
    );
  }
}
