import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import Header from 'components/Header';
import Formula from 'components/formula';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import '../styles/App.scss';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  makeProducts() {
    const elements = [];
    for(let i = 0; i < 10; i++) {
      elements.push(<Formula key={i}/>);
    }
    return elements;
  }

  toggleMenu(){
    this.props.store.flipMenu();
  }

  render () {
    const {store} = this.props;
    return (
      <span className="wrapper">
        {store.openMenu ? <Menu toggleMenu={this.toggleMenu}/> : ''}
        <Header toggleMenu={this.toggleMenu}/>
        <div className="container">
          {this.makeProducts()}
        </div>
        <Footer/>
      </span>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({
    flipMenu: PropTypes.func.isRequired,
    openMenu: PropTypes.bool.isRequired
  })
};
