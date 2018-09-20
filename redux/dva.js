import React, { Component } from 'react';
import dva, { connect } from 'dva';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import model from './model';

const checkServer = () => Object.prototype.toString.call(global.process) === '[object process]';

// eslint-disable-next-line
const __NEXT_DVA_STORE__ =  '__NEXT_DVA_STORE__'

function createDvaStore(initialState) {
  let app;
  if (initialState) {
    app = dva({
      initialState,
    });
  } else {
    app = dva({});
  }
  const isArray = Array.isArray(model);
  if (isArray) {
    model.forEach((m) => {
      app.model(m);
    });
  } else {
    app.model(model);
  }
  app.router(() => {});
  app.start();
  // console.log(app);
  // eslint-disable-next-line
  const store = app._store
  return store;
}

function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) { // run in server
    // console.log('server');
    return createDvaStore(initialState);
  }
  // eslint-disable-next-line
  if (!window[__NEXT_DVA_STORE__]) {
    // console.log('client');
    // eslint-disable-next-line
    window[__NEXT_DVA_STORE__] = createDvaStore(initialState);
  }
  // eslint-disable-next-line
  return window[__NEXT_DVA_STORE__];
}

export default function withDva(...args) {
  return function CreateNextPage(Com) {
    class ComponentWithDva extends Component {
      static defaultProps = {
        store: {},
        initialProps: {},
        initialState: {},
      }
      static propTypes = {
        store: PropTypes.object,
        initialProps: PropTypes.object,
        initialState: PropTypes.object,
      }
      getInitialProps = async (props = {}) => {
        // console.log('get......');
        const isServer = checkServer();
        const store = getOrCreateStore(props.req);
        // call children's getInitialProps
        // get initProps and transfer in to the page
        const initialProps = Com.getInitialProps
          ? await Com.getInitialProps({ ...props, isServer, store })
          : {};
        return {
          store,
          initialProps,
          initialState: store.getState(),
        };
      }
      render() {
        const { store, initialProps, initialState } = this.props;
        const ConnectedComponent = connect(...args)(Com);
        return (
          <Provider store={store && store.dispatch ? store : getOrCreateStore(initialState)}>
            <ConnectedComponent {...initialProps} />
          </Provider>
        );
      }
    }
    return ComponentWithDva;
  };
}
