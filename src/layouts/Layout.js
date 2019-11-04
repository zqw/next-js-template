import React from "react";
import Head from "next/head";
import {Provider, useStaticRendering} from "mobx-react";
import gStore from "../store/gStore";
import GlobalStyle from "../styles/global-styles"

if (!global.window) {
  // is server
  useStaticRendering(true);
}

export default class Layout extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render() {
    let that = this;
    let title = that.props.title || "default title";
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <main>
          <Provider gStore={gStore}>
            <GlobalStyle/>
            <div>{that.props.children}</div>
          </Provider>
        </main>
      </div>
    );
  }
}
