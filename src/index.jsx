import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class Page extends Component {

    // 字段
    state = {
        value: 0,
    };

    // 事件
    onClick = () => {
        const {
            state: { value },
        } = this;

        this.setState({
            value: value + 1,
        });
    };

    // 生命周期函数
    render = () => {
        const {
            // 字段
            state: { value },

            // 事件
            onClick,
        } = this;

        return (
            <div>
                <input type="button" onClick={onClick} value="click" />
                <span>{value}</span>
            </div>
        );
    };
}

ReactDOM.render(
    <Page />,
    document.querySelector('#root')
);