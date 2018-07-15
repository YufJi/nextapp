import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import '../style/antd-theme.less';

export default class extends Document {
  render() {
    return (
      <html lang="zh-CN">
        <Head>
          <meta content="telephone=no" name="format-detection" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="full-screen" content="yes" />
          <meta name="x5-fullscreen" content="true" />

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
