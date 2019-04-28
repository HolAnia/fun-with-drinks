import React from 'react';
import drinks from './drinks';
import ingredients from './ingredients';
import Draggable from './draggable.jsx';
import Droppable from './droppable.jsx';
import Footer from './footer.jsx';

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
let randomNumber = Math.floor((Math.random() * drinks.length - 1));
let randomDrink = drinks[randomNumber].strDrink;
let randomDrinkPictureAdress = drinks[randomNumber].strDrinkThumb;
const Wrapper = (props) => {
    return (
        null
    )
}


class Ingredient extends React.Component {
    render() {
        return (
            <div className="ingredient" onClick={this.props.handleClick}>
                <img src={this.props.ingredientAdress} alt={this.props.ingredientTitle} />
                <p>{this.props.ingredientTitle}</p>
            </div>
        )
    }

}

export default class GameSetBarman extends React.Component {
    state = {
        randomDrinkName: randomDrink,
        rightIngredients: drinks[randomNumber].strIngredients.sort(),
        randomDrinkPictureAdress: randomDrinkPictureAdress,
        allIngredients: [],
        information: '',
        nrDrink: 1,
        score: 0,
    }
    handleClick = (e) => {
        e.currentTarget.classList.toggle('checked');
    }
    shakeIt = () => {
        const checked = document.querySelectorAll('.checked');
        const rightIngredients = this.state.rightIngredients;
        let rightAnswers = [];
        if (checked.length === rightIngredients.length) {
            for (let i = 0; i < rightIngredients.length; i++) {
                for (let j = 0; j < checked.length; j++) {
                    if (rightIngredients[i] == checked[j].querySelector('p').textContent) {
                        checked[j].classList.remove('checked');
                        checked[j].classList.add('green')
                        rightAnswers.push(checked[j]);
                    }
                }
            }
            if (rightAnswers.length === rightIngredients.length) {
                this.setState({
                    information: 'gratulacje!'
                })
            } else {
                this.setState({
                    information: 'przegrałeś!'
                })
            }
        } else if (checked.length < rightIngredients.length) {
            this.setState({
                information: 'za mało składników'
            })
        } else if (checked.length > rightIngredients.length) {
            this.setState({
                information: 'wybrałeś za dużo składników'
            })
        }
    }
    render() {
        return (
            <>
                <div className="barman">
                    <div className="gameBoard center">

                        <div className="titleDrink">
                            <h2>{this.state.randomDrinkName}</h2>
                            <div><p>{this.state.information}</p></div>
                            <Droppable id='dr1'>
                                <div className="allIngredients">
                                    {this.state.allIngredients.map((e, id) => {
                                        let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                                        return <Draggable key={id} id={id}>
                                            <Ingredient key={e.id} ingredientTitle={e} ingredientAdress={adress} handleClick={this.handleClick} />
                                        </Draggable>
                                    })}
                                </div>
                            </Droppable>
                        </div>

                        <div className="mainBoard">
                            <div className="instructions">
                                <p>Choose right ingredients needed to create <span>{this.state.randomDrinkName}</span> drink and put it into shaker. Next <span>shake it </span> and taste it!</p>
                            </div>
                            <Droppable id='dr2'>
                                <div className="svg"></div>
                            </Droppable>
                            <div className="scoreButton"><div className="score"><p>SCORE: <span>{this.state.score}</span>/10</p></div>
                                <button onClick={this.shakeIt}>Shake It</button>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </>
        )
    }
    componentDidMount() {
        let mainIngredients = [...ingredients];
        let allIngredients = [...this.state.rightIngredients];
        while (10 - allIngredients.length != 0) {
            let diferent = true;
            let random = Math.floor((Math.random() * (mainIngredients.length - 1)));
            for (let j = 0; j < allIngredients.length; j++) {
                if (mainIngredients[random] == allIngredients[j]) {
                    diferent = false;
                }
            }
            if (diferent) {
                allIngredients.push(mainIngredients[random])
                mainIngredients = mainIngredients.filter((e) => {
                    return (mainIngredients[random] != e);
                })
            }
        }
        this.setState({
            allIngredients: allIngredients.sort()
        })
    }
}