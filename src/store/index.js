import {observable, computed, autorun} from 'mobx';

class AppStore {
  @observable openMenu = false;
  @observable openSearch = false;
  @observable products = [];

  @computed get productsCount() {
    return this.products.length;
  }

  addProduct() {
    this.products.push({
      id: Math.random()
    });
  }

	flipMenu() {
		this.openMenu = this.openMenu ? false : true;
	}

  flipSearch() {
    this.openSearch = this.openSearch ? false : true;
  }

  constructor() {
    this.flipMenu = this.flipMenu.bind(this);
    this.flipSearch = this.flipSearch.bind(this);
    this.addProduct = this.addProduct.bind(this);
    autorun(() => {
      this.addProduct();
    });
  }
}

export default new AppStore();
