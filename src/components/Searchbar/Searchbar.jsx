import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  Icon,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  onChangeHandler = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };
  onSubmitHandler = event => {
    const { searchValue } = this.state;
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Enter search word');
      return;
    }
    this.props.onSubmit(searchValue);
    this.setState({ searchValue: '' });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmitHandler}>
          <SearchFormButton type="submit">
            <Icon />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.onChangeHandler}
          />
        </SearchForm>
      </Header>
    );
  }
}
