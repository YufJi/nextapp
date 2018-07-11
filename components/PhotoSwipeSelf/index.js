import React, { Component } from 'react';
import PhotoSwipe from 'photoswipe/dist/photoswipe.min.js';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min.js';
import Head from 'next/head';

const videoRE = /\.mp4$/i;

export default class PhotoSwipeSelf extends Component {
  // photoswipe
  openPhotoSwipe = (index, imgArr, options) => {
    const newItem = [];
    imgArr.forEach((imgObj, imgObjIndex) => {
      const item = {};
      if (!videoRE.test(imgObj.src)) {
        item.src = imgObj.src;
        item.w = 0;
        item.h = 0;
        item.index = imgObjIndex;
      } else {
        item.html = `<div style="position:absolute;
          left:0;top:0;right:0;bottom:0;display:flex;
          justify-content:center;align-items:center;
          overflow:hidden;">
            <video src="${imgObj.src}" controls="controls" preload="auto"></video>
          </div>`;
      }
      newItem.push(item);
    });

    this.initPhotoSwipe(options, newItem);
  }
  initPhotoSwipe = (options, newItem) => {
    const pswpElement = this.refs.pswp;
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, newItem, options);
    gallery.listen('imageLoadComplete', (index, item) => {
      const image = new Image();
      image.src = item.src;
      image.onload = () => {
        const { naturalWidth: w, naturalHeight: h } = image;
        // 处理超出屏幕时候的问题
        item.w = w;
        item.h = h;
        // TODO: 优化 做到最好的优化效果
        this.dealWidthtAndHeight(item);
        gallery.updateSize(true);
      };
    });
    gallery.init();
  }
  dealWidthtAndHeight = (item) => {
    let { w } = item;
    const { h } = item;
    // 获取屏幕宽度
    const ratio = w / h;
    const deviceWidth = document.documentElement.clientWidth;
    if (w > deviceWidth) {
      w = deviceWidth;
      item.h = w / ratio;
      item.w = w;
    }
    return item;
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/photoswipe/photoswipe.css" />
          <link rel="stylesheet" type="text/css" href="/static/photoswipe/default-skin/default-skin.css" />
        </Head>
        <div className="pswp" tabIndex="0" role="dialog" aria-hidden="true" ref="pswp">
          {/* <!-- Background of PhotoSwipe.
                       It's a separate element as animating opacity is faster than rgba(). --> */}
          <div className="pswp__bg" />
          {/* <!-- Slides wrapper with overflow:hidden. --> */}
          <div className="pswp__scroll-wrap">
            {/* <!-- Container that holds slides.
                          PhotoSwipe keeps only 3 of them in the DOM to save memory.
                          Don't modify these 3 pswp__item elements, data is added later on. --> */}
            <div className="pswp__container">
              <div className="pswp__item" />
              <div className="pswp__item" />
              <div className="pswp__item" />
            </div>
            {/* <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. --> */}
            <div className="pswp__ui pswp__ui--hidden">
              <div className="pswp__top-bar">
                {/* <!--  Controls are self-explanatory. Order can be changed. --> */}
                <div className="pswp__counter" />
                <button className="pswp__button pswp__button--close" title="Close (Esc)" />

                {/* <button className="pswp__button pswp__button--share" title="Share"></button> */}

                {/* <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> */}

                {/* <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button> */}

                {/* <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running --> */}
                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip" />
              </div>
              <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />
              <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />
              <div className="pswp__caption">
                <div className="pswp__caption__center" />
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
        .pswp__counter{
          font-size: .32rem;
          line-height: .6rem;
          width: 100%;
          text-align:center;
        }
        .pswp__top-bar{
          padding: .08rem .15rem;
          height: .6rem;
        }
        .pswp__button--close{
          background-image: none;
          background:url('../../static/close.png') center no-repeat;
          background-size:100%;
          width: .44rem;
          height: .44rem;
        }
        `}
        </style>
      </div>

    );
  }
}
