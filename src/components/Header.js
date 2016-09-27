import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import 'styles/Header.scss';

export default class Header extends Component {
  makeSearch() {
    const {openSearch, onSearchClick} = this.props;
    if(!openSearch) {
      return (
        <i className="fa fa-search" onClick={onSearchClick}></i>
      );
    } else {
      return (
        <div id="searchWrapper">
          <input type="text" autoFocus placeholder="Search by color, style, etc" />
        </div>
      );
    }
  }
  render () {
    return (
      <header>
        <i className="fa fa-bars" onClick={this.props.toggleMenu}></i>
        <div id="logo">
          <Link to="/"><h1>FormulaShare</h1></Link>
        </div>
        {this.makeSearch()}
      </header>
    );
  }
}

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  openSearch: PropTypes.bool.isRequired,
  onSearchClick: PropTypes.func.isRequired
};
