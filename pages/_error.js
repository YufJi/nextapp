import React from 'react';
import PropTypes from 'prop-types';

const errMap = {
  404: '找不到页面',
  401: '权限受限',
  499: '权限受限',
  500: '页面解析失败',
  1000: '服务器内部错误',
};

export default class extends React.Component {
  static propTypes = {
    statusCode: PropTypes.number.isRequired,
  }
  static getInitialProps({ res, err }) {
    const statusCode = err ? err.statusCode : res ? res.statusCode : 0;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    const text = errMap[statusCode] || '未知错误';

    return (
      <div className="error">
        <div className="h100">
          <div className="tc">
            <div className="code dib">
              {statusCode}
            </div>
            <div className="text dib">
              {text} :(
            </div>
          </div>
        </div>
      </div>
    );
  }
}
