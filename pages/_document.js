import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import './antd-theme.less';

export default class extends Document {
  render() {
    return (
      <html lang="zh-CN" data-scale="true">
        <Head>
          <meta content="telephone=no" name="format-detection" />
          <link rel="stylesheet" href="/_next/static/style.css" />

          <script src="/static/hd.min.js" />
          <script src="/static/fastclick.min.js" />
          <script src="/static/launchFastClick.js" />
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
