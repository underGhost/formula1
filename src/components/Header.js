import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router';
import 'styles/Header.scss';

@observer
export default class Header extends Component {
  makeSearch() {
    const {openSearch, onSearchClick, onSearchPress} = this.props;
    if(!openSearch) {
      return (
        <i className="fa fa-search" onClick={onSearchClick}></i>
      );
    } else {
      return (
        <div id="searchWrapper">
          <input type="text" autoFocus placeholder="Search by color, style, etc" onKeyDown={onSearchPress} />
        </div>
      );
    }
  }
  render () {
    return (
      <header>
        {this.props.store.authToken ? <i className="fa fa-bars" onClick={this.props.toggleMenu}></i> : ''}
        <div id="logo">
          <Link to="/"><h1>FormulaShare</h1></Link>
        </div>
        {this.props.store.authToken ? this.makeSearch() : ''}
      </header>
    );
  }
}

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  openSearch: PropTypes.bool.isRequired,
  onSearchClick: PropTypes.func.isRequired
};
