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
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  makeProducts() {
    const {productsCount, products} = this.props.store;
    const elements = [];
    for(let i = 0; i < productsCount; i++) {
      elements.push(<Formula key={i} id={products[i].id}/>);
    }
    return elements;
  }

  toggleMenu(){
    const {flipMenu} = this.props.store;
    flipMenu();
  }

  onSearchClick() {
    const {flipSearch} = this.props.store;
    flipSearch();
  }

  render () {
    const {store} = this.props;
    return (
      <span className="wrapper">
        {store.openMenu ? <Menu toggleMenu={this.toggleMenu}/> : ''}
        <Header toggleMenu={this.toggleMenu} openSearch={store.openSearch} onSearchClick={this.onSearchClick}/>
        <span>Total Products: {store.productsCount}</span>
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
    products: PropTypes.object.isRequired,
    productsCount: PropTypes.number.isRequired,
    flipMenu: PropTypes.func.isRequired,
    flipSearch: PropTypes.func.isRequired,
    openMenu: PropTypes.bool.isRequired
  })
};
