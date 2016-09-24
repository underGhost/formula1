import React, {Component, PropTypes} from 'react';
import 'styles/Header.scss';

export default class Header extends Component {
  render () {
    return (
      <header>
        <i className="fa fa-bars" onClick={this.props.toggleMenu}></i>
        <div id="logo">
          <h1>FormulaShare</h1>
        </div>
        <i className="fa fa-search"></i>
      </header>
    );
  }
}

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};
