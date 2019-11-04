import React from "react";
import styled from "styled-components";
import {rgba} from "../styles/style-utils";
import {action, observable} from "mobx";
import {inject, observer} from "mobx-react";
import axios from "../drivers/clientAxios";
import {phoneGetDataAsync} from "../drivers/phoneItems";
import cdn from "../utils/cdn"

let Wrapper = styled.div`
  .ss-outer {
    height: 16rem;
    height: calc(100vh - 1.44rem);
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 0.54rem;   
    display: flex;
         
  }
`;

class Store {
  @observable field1 = 1; // 三种模式1:闪灯 2：闪灯+鸣笛 3：鸣笛

  @action
  setSeekMode(field1) {
    this.field1 = field1;
  }
}

@inject("gStore")
@observer
class Component1 extends React.Component {
  constructor(props) {
    super(props);
    this.store = new Store();
  }


  componentDidMount() {
    let that = this;
  }

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }
  }

  getStatus() {
    window.phoneSetUrl('telecontrol timeinterval', '')

    let that = this
    return axios
      .post('/api/GET_VEHICLE_STATE')
      .then(function (res) {
        console.log(res)
        window.phoneSetUrl(res.data.url, res.data.data)
        if (
          res.data &&
          res.data.data &&
          res.data.data.body &&
          res.data.data.body.vehicleSts &&
          res.data.data.body.vehicleSts.carStatus
        ) {
          console.log('carStatus', res.data.data.body)
          let carStatus = res.data.data.body.vehicleSts.carStatus
          that.store.airIsOff = carStatus.cdngoff
          // that.store.airIsOff= 0;
          that.store.drvDoorLockSts = carStatus.drvDoorLockSts;

          that.store.setLeftTopDoor(carStatus.drvDoorSts)
          that.store.setLeftDownDoor(carStatus.rlDoorSts)
          that.store.setRightTopDoor(carStatus.passDoorSts)
          that.store.setRightDownDoor(carStatus.rrDoorSts)
          that.store.setBackDoor(carStatus.trunkSts)
          that.store.setLampState(carStatus.dippedHeadlight)
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  clickWindow(value) {
    return function () {
      window.phoneSetUrl("clickWindow", "click");

      if (!window.phoneGetNetWorkStatus()) {
        window.phoneAlterMessage("无网络，请检查网络后重试", -9999);
        return;
      }

      if (value === 1) {
        window.phoneSetUrl("clickWindow", "openWindow");

        return phoneGetDataAsync("scyPwd").then(function () {
          return axios
            .post("/api/SEND_COMMON_COMMAND", {action: "openWindow"})
            .then(function (res) {
              window.phoneSetUrl(res.data.url, res.data.data)
              if (res.data && res.data.data && res.data.data.header && res.data.data.header.m === "Success") {
                window.phoneAlterMessage("开窗指令执行中", res.data.data.header.c);
                window.phoneShake();
              } else if (res.data.data.header.c === -53) {
                window.phoneAlterMessage("上一个指令正在执行", res.data.data.header.c);
              } else if (res.data.data.header.c === -101) {
                window.phoneAlterMessage("您的帐号已在其他设备登陆，请重新登录", res.data.data.header.c);
              } else {
                window.phoneAlterMessage(res.data.data.header.m, res.data.data.header.c);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        });


      } else if (value === 0) {
        window.phoneSetUrl("clickWindow", "closeWindow");

        return phoneGetDataAsync("scyPwd").then(function () {
          return axios
            .post("/api/SEND_COMMON_COMMAND", {action: "closeWindow"})
            .then(function (res) {
              window.phoneSetUrl(res.data.url, res.data.data)
              if (res.data && res.data.data && res.data.data.header && res.data.data.header.m === "Success") {
                window.phoneAlterMessage("关窗指令执行中", res.data.data.header.c);
                window.phoneShake();
              } else if (res.data.data.header.c === -53) {
                window.phoneAlterMessage("上一个指令正在执行", res.data.data.header.c);
              } else if (res.data.data.header.c === -101) {
                window.phoneAlterMessage("您的帐号已在其他设备登陆，请重新登录", res.data.data.header.c);
              } else {
                window.phoneAlterMessage(res.data.data.header.m, res.data.data.header.c);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="ss-outer">
        </div>
      </Wrapper>
    );
  }
}

export default Component1;
