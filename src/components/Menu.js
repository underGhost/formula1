import React, {Component, PropTypes} from 'react';
if(process.env.BROWSER) {
  require('styles/Menu.scss');
}

export default class Menu extends Component {
  render () {
    const {toggleMenu} = this.props;
    return (
      <section className="menu">
        <i className="fa fa-close close" onClick={toggleMenu}></i>
        <h2>Categories</h2>
        <ul>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
          <li>Link 1</li>
        </ul>
      </section>
    );
  }
}

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};
