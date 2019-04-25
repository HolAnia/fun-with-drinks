import React from 'react';


export default class Nav extends React.Component {
    render() {
        return (
            <nav className="center">
                <div className="logo">
                    <h3>Fun with drinks</h3>
                </div>
                <div className="menu">
                    <ul>
                        <a href="#"><li>search</li></a>
                        <a href="#"><li>barman game</li></a>
                        <a href="#"><li>coneser game</li></a></ul>
                </div>
            </nav>
        )
    }
} 