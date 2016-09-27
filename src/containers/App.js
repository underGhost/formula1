import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import Header from 'components/Header';
import Formula from 'components/formula';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import store from '../store';
import '../styles/App.scss';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  componentWillMount() {
    let instagramHash = this.props.location.hash && this.props.location.hash.indexOf('access_token') > 0 ? this.props.location.hash : '';
    if(instagramHash) {
      instagramHash = instagramHash.replace('#access_token=', '');
      store.saveAuthToken(instagramHash);
      this.context.router.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location !== this.props.location && store.authToken) {
      store.fetchMedia();
      console.log(store);
    }
  }

  makeProducts() {
    const {productsCount, products} = store;
    const elements = [];
    for(let i = 0; i < productsCount; i++) {
      elements.push(<Formula key={i} id={products[i].id}/>);
    }
    return elements;
  }

  toggleMenu(){
    const {flipMenu} = store;
    flipMenu();
  }

  onSearchClick() {
    const {flipSearch} = store;
    flipSearch();
  }

  render () {
    return (
      <span className="wrapper">
        {store.openMenu ? <Menu toggleMenu={this.toggleMenu} userLogin={this.userLogin}/> : ''}
        <Header toggleMenu={this.toggleMenu} openSearch={store.openSearch} onSearchClick={this.onSearchClick}/>
        <span>Total Products: {store.productsCount}</span>
        <div className="container">
          {this.props.children}
        </div>
        <Footer/>
      </span>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  store: PropTypes.shape({
    products: PropTypes.object.isRequired,
    productsCount: PropTypes.number.isRequired,
    flipMenu: PropTypes.func.isRequired,
    flipSearch: PropTypes.func.isRequired,
    openMenu: PropTypes.bool.isRequired
  })
};

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};
