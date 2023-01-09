import PropTypes from 'prop-types';
import { Button } from './LoadMoreButton.styled';

export default function LoadMoreButton({ onLoadMore }) {
  return (
    <Button type="button" onClick={onLoadMore}>
      Load more
    </Button>
  );
}
LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
