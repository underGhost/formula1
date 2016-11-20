import React, {Component} from 'react';
if(process.env.BROWSER) {
  require('styles/Footer.scss');
}

export default class Footer extends Component {
  render () {
    return (
      <footer>
        This is the footer element!
      </footer>
    );
  }
}
