import {observable, computed} from 'mobx';
import 'es6-promise';
import fetch from 'isomorphic-fetch';
class AppStore {
  /*
    STATE VALUES
  */

  @observable openMenu = false;
  @observable openSearch = false;
  @observable products = {};
  @observable authToken = null;

  /*
    COMPUTE VALUES
  */
  @computed get productsCount() {
    return this.products.data ? this.products.data.length : 0;
  }

  /*
    ACTIONS
  */

  fetchMedia() {
    var _this = this;
    fetch('/auth?token='+this.authToken)
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(data) {
        _this.products = data;
      });
  }

  addProduct() {
    this.products.push({
      id: Math.random()
    });
  }

  saveAuthToken(token) {
    console.log(token);
    this.authToken = token;
  }

	flipMenu() {
		this.openMenu = this.openMenu ? false : true;
	}

  submitSearch(term) {
    const _this = this;
    fetch('/auth?term='+term+'&token='+this.authToken)
      .then((response) => {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then((data) => {
        _this.products = data;
      });
  }

  flipSearch() {
    this.openSearch = this.openSearch ? false : true;
  }

  constructor() {
    this.flipMenu = this.flipMenu.bind(this);
    this.flipSearch = this.flipSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }
}

export default new AppStore();
