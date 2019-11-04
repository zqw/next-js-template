import {action, computed, observable} from "mobx";

let i = 0;

class GStore {

  @observable
  canSignalType = "xxxxx";

  @observable
  userInfo = {
    name: "xxx"
  };

  @computed
  get username() {
    return this.userInfo.name;
  }

  @action
  setUserName(name) {
    let nameArr = ["name1", "name2", "name3", "name4"];
    this.userInfo = {
      name: nameArr[i]
    };
    if (i < 3) {
      i++;
    } else {
      i = 0;
    }
  }
}

export default new GStore();
