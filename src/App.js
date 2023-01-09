import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { Component } from 'react';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
  };
  onFormSubmitHandler = searchValue => {
    this.setState({ searchValue, page: 1 });
  };
  onLoadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { searchValue, page } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onFormSubmitHandler} />
        <ImageGallery
          searchValue={searchValue}
          page={page}
          onLoadMore={this.onLoadMoreButton}
        />

        <ToastContainer position="top-center" theme="colored" />
      </div>
    );
  }
}

export default App;
