import Head from 'next/head';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import style from '../style/index.scss';

class Index extends Component {
  static async getInitialProps({ query, store }) {
    // 发起请求
    // await store.dispatch(fetchListData());
    return {};
  }

  onChange = (e) => {
    console.log(e.target.value);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/onInput',
      payload: e.target.value,
    });
  }

  render() {
    console.log(this.props, 'props');
    const { name } = this.props;
    return (
      <div>
        <div>
          <input type="text" value={name} placeholder="12313" onInput={e => this.onChange(e)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => {
  return { ...global };
};

export default connect(mapStateToProps)(Index);
