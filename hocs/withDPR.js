import React, { Component } from 'react';

export default WrappedComponent => (
  class WithDPR extends Component {
    static async getInitialProps(obj) {
      if (WrappedComponent.getInitialProps) {
        return WrappedComponent.getInitialProps(obj);
      }
      return {};
    }

    constructor(props) {
      super(props);
      this.state = { dpr: 2 };
    }

    componentWillMount() {
      // 有时候会失效
      // 在挂载完成后再获取一下
      this.getDpr();
    }

    componentDidMount() {
      this.getDpr();
    }

    getDpr = () => {
      if (typeof window !== 'undefined') {
        this.setState({ dpr: window.devicePixelRatio });
      }
    }

    render() {
      return <WrappedComponent dpr={this.state.dpr} {...this.props} />;
    }
  }
);
