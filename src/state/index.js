import {observable} from 'mobx';

class AppStore {
  @observable openMenu = false;

  constructor() {
  }

	flipMenu() {
		this.openMenu = this.openMenu ? false : true;
	}
}

export default new AppStore();
