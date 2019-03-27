import React, { Component } from 'react';

class Squares extends Component {
    getRowSquares() {
        let squares = [];
        for (let i = 0; i < this.props.x; i++) {
            squares.push(<div onClick={this.props.function} className="emptySlot slot"></div>)
        }
        return squares
    }
    render() {
        let view = this.getRowSquares();
        return (
        <React.Fragment>
            {view}
        </React.Fragment>
        )
    }
}

export default Squares