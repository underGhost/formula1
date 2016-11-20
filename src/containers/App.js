import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import Header from 'components/Header';
import Formula from 'components/formula';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import store from '../store';
if(process.env.BROWSER) {
  require('styles/App.scss');
}

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
    this.propsToChildren = this.propsToChildren.bind(this);
  }

  componentWillMount() {
    let instagramHash = this.props.location.hash && this.props.location.hash.indexOf('access_token') > 0 ? this.props.location.hash : '';
    if(instagramHash) {
      instagramHash = instagramHash.replace('#access_token=', '');
      store.saveAuthToken(instagramHash);
      this.context.router.replace('/formulas');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location !== this.props.location && store.authToken) {
      store.fetchMedia();
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

  onSearchPress(e) {
    const {flipSearch, submitSearch} = store;
    //If search submitted
    if(e.keyCode === 13) {
      submitSearch(e.target.value);
      this.onSearchClick();
    }
    //If escape is hit
    if(e.keyCode === 27) {
      flipSearch();
    }
  }

  propsToChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        store: store
      });
    });
  }

  render () {
    return (
      <span className="wrapper">
        {store.openMenu ? <Menu toggleMenu={this.toggleMenu} userLogin={this.userLogin}/> : ''}
        <Header store={store} toggleMenu={this.toggleMenu} openSearch={store.openSearch} onSearchPress={this.onSearchPress} onSearchClick={this.onSearchClick}/>
        <div className="container">
          {this.propsToChildren()}
        </div>
        <Footer/>
      </span>
    );
  }
}

export default App;

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
