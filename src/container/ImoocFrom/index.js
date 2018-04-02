import React from 'react';

//提取高阶组件,共用handleChange方法,不用每次都手动写该函数.
export default function ImoocForm(Component) {
    return class WrapperComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(key, val) {
            this.setState({
                [key]: val
            })
        }

        render() {
            return <Component
                handleChange={this.handleChange}
                state={this.state}
                {...this.props}
            />
        }
    }
}

