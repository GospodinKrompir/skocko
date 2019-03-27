import React, { Component } from 'react';

class Circles extends Component {
    getRowCircles() {
        let circles = [];
        for (let i = 0; i < this.props.x; i++) {
            circles.push(<div className="krug checkdiv"></div>)
        }
        return circles
    }
    render() {
        let view = this.getRowCircles();
        return (
        <React.Fragment>
            {view}
        </React.Fragment>
        )
    }
}

export default Circles