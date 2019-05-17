
import React from 'react';
import ReactDOM from 'react-dom';
import style from '../scss/style/main.scss'
import Search from './search.jsx';
import GameSetBarman from './barman.jsx';
import GameSetConeser from './coneser.jsx';
import Question from './question.jsx';
import Footer from './footer.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';



class App extends React.Component {
    state = {
        age: '',
    }
    passAge = (arg) => {
        this.setState({
            age: arg
        })
    }
    render() {
        const info = <p><a target="_blank" href="https://www.vexels.com/vectors/preview/144120/neon-cocktails-sign"> Neon cocktails sign </a></p>;

        if (this.state.age === '') {
            return (
                <Question passClick={this.passAge} />
            )
        } else {
            if (this.state.age < 18) {
                return (
                    <>
                        <div className="sorry">
                            <h1>Sorry, you are too young to explore the world of drinks...</h1>
                            <div className="logo"></div>
                        </div>
                        <Footer info={info} />
                    </>
                )
            } else {
                return (
                    <Router>
                        <>
                            <nav className="center">
                                <div className="logo">
                                    <h3>Fun with drinks</h3>
                                </div>
                                <div className="menu">
                                    <ul>
                                        <li><NavLink activeStyle={{ color: "#070707", backgroundColor: "#F19FBF" }} to="/search">search</NavLink></li>
                                        <li><NavLink activeStyle={{ color: "#070707", backgroundColor: "#F19FBF" }} to="/barman">barman game</NavLink></li>
                                        <li><NavLink activeStyle={{ color: "#070707", backgroundColor: "#F19FBF" }} to="/coneser">coneser game</NavLink></li>
                                    </ul>
                                </div>
                            </nav>

                            <Switch>
                                <Route exact path="/" component={Search}></Route>
                                <Route path="/search" component={Search}></Route>
                                <Route path="/barman" component={GameSetBarman}></Route>
                                <Route path="/coneser" component={GameSetConeser}></Route>
                            </Switch>
                        </>
                    </Router>
                )
            }

        }




    }
}
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});