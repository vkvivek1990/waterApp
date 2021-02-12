import React from 'react';
import 'material-icons/iconfont/material-icons.scss';

export default class Icons extends React.Component {

    render() {
//        debugger
        return (
            <span className={`material-icons ${this.props.className}`}>{ this.props.children }</span>
        )
    }
} 