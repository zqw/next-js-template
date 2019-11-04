import React from "react";
import Layout from "../../layouts/Layout";
import Component1 from "../../components/Telecontrol";


class PageTelecontrol extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout title="远程控制">
        <Component1/>
      </Layout>
    );
  }
}

export default PageTelecontrol;
