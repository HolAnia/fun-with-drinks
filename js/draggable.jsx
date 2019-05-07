import React from 'react';
import PropTypes from 'prop-types';

export default class Draggable extends React.Component {
    drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    }

    noAllowDrop = (e) => {
        e.stopPropagation();
    }
    render() {
        return (
            <div className="draggable" id={this.props.id} url={this.props.img} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style} onClick={this.props.handleClick}>
                {this.props.children}
            </div>
        )
    }
}
Draggable.propTypes = {
    id: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.node,
    url: PropTypes.string
}