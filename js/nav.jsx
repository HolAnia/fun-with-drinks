import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';



export default class Nav extends React.Component {
    render() {
        return (
            <Router>
                <nav className="center">
                    <div className="logo">
                        <h3>Fun with drinks</h3>
                    </div>
                    <div className="menu">
                        <ul>
                            <a href="#"><li><NavLink to="/search">search</NavLink></li></a>
                            <a href="#"><li><NavLink to="/barman">barman game</NavLink></li></a>
                            <a href="#"><li><NavLink to="/coneser">coneser game</NavLink></li></a></ul>
                    </div>
                </nav>

                <Switch>
                    <Route path="/search" component={Search}></Route>
                    <Route path="/barman" component={GameSetBarman}></Route>
                    <Route path="/coneser" component={GameSetConeser}></Route>
                </Switch>
            </Router>
        )
    }
} 