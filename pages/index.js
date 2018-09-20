import Head from 'next/head';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from '../style/index.scss';

@withDPR
class Index extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
  }

  static async getInitialProps({ query, store }) {
    // 发起请求
    await store.dispatch(fetchListData());
    return {

    };
  }

  log = async () => {
    Toast.loading('接口请求...', 0);
    await this.props.fetchData();
    Toast.hide();
  }

  render() {
    const { profile, url, data, imgHeight } = this.props;
    return ([
      <div key="dom">
        <div className={style.a}>sdfa</div>
      </div>,
    ]);
  }
}

export default Index;
