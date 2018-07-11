import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Toast, Card, WhiteSpace } from 'antd-mobile';
import { initStore } from '../redux/store';
import withDPR from '../hocs/withDPR';
import { fetchShopData } from '../redux/actions/shop';

@withDPR
class ShopProfile extends Component {
  static async getInitialProps({ query, store }) {
    // 发起请求
    await store.dispatch(fetchShopData());
    return {};
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
  }
  log = () => {
    Toast.loading('接口请求...', 90);
    console.log(this.props.list);
  }
  render() {
    const { profile, url } = this.props;
    const { exception_task = [] } = profile;
    return (
      <div onClick={this.log}>
        <Card full>
          <Card.Header
            title="This is title"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>This is content of `Card`</div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ shop }) => {
  const { exception_task = [], list } = shop.profile;
  return {
    profile: {
      exception_task,
    },
    list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: bindActionCreators(fetchShopData, dispatch),
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ShopProfile);
