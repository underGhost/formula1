import React, {Component, PropTypes} from 'react';
import 'styles/Menu.scss';

export default class Menu extends Component {
  render () {
    const {toggleMenu} = this.props;
    return (
      <section className="menu">
        <i className="fa fa-close close" onClick={toggleMenu}></i>
        <a href="https://api.instagram.com/oauth/authorize/?client_id=391741d96c7440aab019e10ce25519f0&redirect_uri=http://formulashare.com:8000&response_type=token">Login</a>
      </section>
    );
  }
}

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};
