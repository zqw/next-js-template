import React from "react";
import Layout from "../../layouts/Layout";
import Component1 from "../../components/Component1";


class Page1 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout title="page1">
        <Component1/>
      </Layout>
    );
  }
}

export default Page1;
