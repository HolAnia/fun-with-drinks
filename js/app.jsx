import React from 'react';
import ReactDOM from 'react-dom';
import style from '../scss/style/main.scss'
import Nav from './nav.jsx';
import Search from './search.jsx';
import GameSetBarman from './barman.jsx';
import GameSetConeser from './coneser.jsx';
import Footer from './footer.jsx';


class App extends React.Component {
    render() {
        return (
            <>
                <Nav />
                <Search />
                {/* <GameSetBarman />
                <GameSetConeser /> */}
                <Footer />
            </>
        )
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});