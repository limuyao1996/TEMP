import React, { PureComponent, Component } from 'react';
// import './app.css';
import './app.less';
import img01 from './static/img01.jpg';
import img02 from './static/img02.jpeg';

class App extends PureComponent {
    render () {
        console.log(img01);
        console.log(img02);
        return (
            <div className="test-app">
                <h1>Hello World~</h1>
                <h1>Hello World~</h1>
                <h1>Hello World~</h1>
                <h1>Hello World~</h1>
                <h1>Hello World~</h1>
                <h1>Hello World~</h1>
                <h1>Hello World~</h1>
                <h1>Hello webpack~</h1>
                <h1>Hello World~</h1>
                <h1>Hello webpack~</h1>
                <h1>Hello World~</h1>
            </div>
        );
    }
}

export default App;
