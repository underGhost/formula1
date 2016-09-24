import React, {Component, PropTypes} from 'react';
import 'styles/Menu.scss';

export default class Menu extends Component {
  render () {
    const {toggleMenu} = this.props;
    return (
      <section className="menu">
        This is the menu
        <i className="fa fa-close close" onClick={toggleMenu}></i>
      </section>
    );
  }
}

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};
