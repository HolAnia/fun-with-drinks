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
        nextDrink: false,
        score: 0,
        step: 1,
        droppedIngredients: [],
    }
    // handleClick = (e) => {
    //     const newIngredient = e.cloneNode();
    //     document.querySelector('.svg').appendChild(newIngredient);
    //     e.style.displ
    // }
    shakeIt = () => {

        const elements = document.querySelectorAll('.svg .draggable .ingredient p');
        let choosenIngredients = []
        for (let i = 0; i < elements.length; i++) {
            choosenIngredients.push(elements[i].textContent)
        }
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
                const imgDrink = document.createElement('img');
                imgDrink.src = this.state.randomDrinkPictureAdress;
                imgDrink.classList.add('imgDrink');
                picture.appendChild(imgDrink);
                document.querySelectorAll('.svg .draggable').forEach((e) => e.style.display = "none");

                this.setState({
                    information: 'gratulacje!',
                    score: this.state.score + 1,

                })
            } else {

                document.querySelector('.mainBoard').classList.add('wrong');
                document.querySelector('.mainBoard .instructions').style.display = "none";
                document.querySelector('.mainBoard .svg').style.display = "none";
                document.querySelector('.scoreButton .score').style.display = "none";
                document.querySelector('.scoreButton .shakeIt').style.display = "none";
                document.querySelectorAll('.svg .draggable').forEach((e) => e.style.display = "none");

                this.setState({
                    information: 'przegrałeś!',

                })
            }
            document.querySelector('.nextDrink').style.display = "block";
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
        document.querySelector('.svg .imgDrink').style.display = 'none';
        const randomNumberNext = Math.floor((Math.random() * drinks.length - 1));
        this.setState({
            randomDrinkName: drinks[randomNumberNext].strDrink,
            randomDrinkPictureAdress: drinks[randomNumberNext].strDrinkThumb,
            rightIngredients: drinks[randomNumberNext].strIngredients.sort(),
            step: this.state.step + 1,
            information: '',
            nextDrink: true,

        })
    }
    componentDidUpdate() {
        console.log('dokonała się zmiana')
        if (this.state.nextDrink) {
            this.createIngredients();
            document.querySelector('.mainBoard').classList.remove('wrong');
            document.querySelector('.mainBoard .instructions').style.display = "block";
            document.querySelector('.mainBoard .svg').style.display = "flex";
            document.querySelector('.scoreButton .score').style.display = "block";
            document.querySelector('.scoreButton .shakeIt').style.display = "block";
            this.setState({
                nextDrink: false,

            })
        }
        if (this.state.droppedIngredients.length > 0) {
            console.log('coś tam jest');
            this.state.droppedIngredients.forEach((e) => {
                const newDragg = e.cloneNode(true);
                newDragg.style.display = "flex";
                document.querySelector('#dr1 .allIngredients').appendChild(newDragg);
                e.remove();
            })
            this.setState({
                droppedIngredients: []
            })
        }
    }
    createBoard = () => {
        return (
            <>
                <div className="barman">
                    <div className="gameBoard center">
                        <div className="titleDrink">
                            <h2>{this.state.randomDrinkName}</h2>
                            <div><p>{this.state.information}</p></div>
                            <Droppable id='dr1'>
                                <div className="allIngredients">
                                    {this.createDraggable()}
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
                                <button className='nextDrink' style={{ display: "none" }} onClick={this.nextDrink}>Next drink</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    createIngredients = () => {
        this.setState({
            allIngredients: [],
            droppedIngredients: document.querySelectorAll('#dr2 .draggable'),

        })
        let mainIngredients = [...ingredients];
        console.log(this.state.rightIngredients);
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
    createDraggable = () => {
        return (this.state.allIngredients.map((e, id) => {
            let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
            return <Draggable key={id} id={id} url={adress} className="draggable">
                <Ingredient key={e.id} ingredientTitle={e} ingredientAdress={adress} handleClick={this.handleClick} />
            </Draggable>
        }))
    }
    render() {
        return (
            this.createBoard()
        )
    }
    componentDidMount() {
        this.createIngredients();

    }
}