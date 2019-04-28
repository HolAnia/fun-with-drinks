import React from 'react';
import drinks from './drinks';
import ingredients from './ingredients';
import Draggable from './draggable.jsx';
import Droppable from './droppable.jsx';
import Footer from './footer.jsx';

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// let randomNumber = Math.floor((Math.random() * drinks.length - 1));
// let randomDrink = drinks[randomNumber].strDrink;
// let randomDrinkPictureAdress = drinks[randomNumber].strDrinkThumb;

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
const randomNumber = Math.floor((Math.random() * drinks.length - 1));
export default class GameSetBarman extends React.Component {
    state = {

        allDrinks: [],
        randomDrinkName: drinks[randomNumber].strDrink,
        rightIngredients: drinks[randomNumber].strIngredients.sort(),
        randomDrinkPictureAdress: drinks[randomNumber].strDrinkThumb,
        allIngredients: [],
        information: '',
        nrDrink: 1,
        score: 0,
        step: 1,
    }
    handleClick = (e) => {
        e.currentTarget.classList.toggle('checked');
    }
    shakeIt = () => {
        const elements = document.querySelectorAll('.svg .draggable .ingredient p');
        let choosenIngredients = []
        for (let i = 0; i < elements.length; i++) {
            choosenIngredients.push(elements[i].textContent)
        }
        console.log(choosenIngredients)

        // const checked = document.querySelectorAll('.checked');
        const rightIngredients = this.state.rightIngredients;
        let rightAnswers = [];
        if (choosenIngredients.length === rightIngredients.length) {
            for (let i = 0; i < rightIngredients.length; i++) {
                for (let j = 0; j < choosenIngredients.length; j++) {
                    if (rightIngredients[i] == choosenIngredients[j]) {
                        // checked[j].classList.remove('checked');
                        // choosenIngredients[j].classList.add('green')
                        rightAnswers.push(choosenIngredients[j]);
                    }
                }
            }
            if (rightAnswers.length === rightIngredients.length) {
                const picture = document.querySelector('.svg')
                picture.style.backgroundImage = `url(${this.state.randomDrinkPictureAdress})`;
                picture.style.backgroundPosition = "center";
                picture.style.backgroundSize = "contain";
                document.querySelectorAll('.svg .draggable').forEach((e) => e.remove());
                this.setState({
                    information: 'gratulacje!',
                    score: this.state.score + 1,
                })


            } else {

                const picture = document.querySelector('.mainBoard')
                picture.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2016/09/07/10/37/kermit-1651325_960_720.jpg)";
                picture.style.backgroundPosition = "center";
                picture.style.backgroundSize = "contain";
                picture.style.backgroundRepeat = "no-repeat"
                document.querySelector('.mainBoard .instructions').remove();
                document.querySelector('.mainBoard .svg').remove();
                document.querySelector('.scoreButton .score').style.display = "none";
                document.querySelector('.scoreButton .shakeIt').style.display = "none";

                this.setState({
                    information: 'przegrałeś!'
                })
            }
        } else if (choosenIngredients.length < rightIngredients.length) {
            this.setState({
                information: 'za mało składników'
            })
        } else if (choosenIngredients.length > rightIngredients.length) {
            this.setState({
                information: 'wybrałeś za dużo składników'
            })
        }
    }
    nextDrink = () => {

        this.setState({
            randomNumber: Math.floor((Math.random() * drinks.length - 1)),
            step: this.state.step + 1,

        })
        this.setState({
            randomDrinkName: drinks[this.state.randomNumber].strDrink,
            randomDrinkPictureAdress: drinks[this.state.randomNumber].strDrinkThumb,
        })
        this.setState({
            allDrinks: [...this.state.allDrinks, this.state.randomDrinkName],
        })

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
                                        return <Draggable key={id} id={id} url={adress} className="draggable">
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
                                <button className='shakeIt' onClick={this.shakeIt}>Shake It</button>
                                <button className='nextDrink' onClick={this.nextDrink}>Next drink</button>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </>
        )
    }
    componentDidMount() {
        this.setState({
            allDrinks: [...this.state.allDrinks, this.state.randomDrinkName],

        })

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