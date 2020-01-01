import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import 'antd/dist/antd.css';

ReactDom.render(<App />, document.getElementById('root'));

// HMR热更新支持
// eslint-disable-next-line no-undef
if (module.hot) {
	// eslint-disable-next-line no-undef
	module.hot.accept();
}