import Head from 'next/head';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Toast, Card, Carousel } from 'antd-mobile';

import { initStore } from '../redux/store';
import withDPR from '../hocs/withDPR';
import { fetchListData } from '../redux/actions/shop';

@withDPR
class ShopProfile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
  }


  static async getInitialProps({ query, store }) {
    // 发起请求
    await store.dispatch(fetchListData());
    return {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 176,
    };
  }

  log = async () => {
    Toast.loading('接口请求...', 0);
    await this.props.fetchData();
    Toast.hide();
  }

  render() {
    const { profile, url, data, imgHeight } = this.props;
    return (
      <div>
        <Head>
          <title>next.js app</title>
        </Head>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%' }}
              />
            </a>
          ))}
        </Carousel>
        <Card full onClick={this.log}>
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
    fetchData: bindActionCreators(fetchListData, dispatch),
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ShopProfile);
