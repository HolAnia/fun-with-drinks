import React from 'react';
import drinks from './drinks';
import ingredients from './ingredients';
import Footer from './footer.jsx';

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const randomNumber = Math.floor((Math.random() * (drinks.length - 1)));
export default class GameSetBarman extends React.Component {
    state = {
        allNumbers: [randomNumber],
        randomDrinkName: drinks[randomNumber].strDrink,
        rightIngredients: drinks[randomNumber].strIngredients.sort(),
        randomDrinkPictureAdress: drinks[randomNumber].strDrinkThumb,
        allIngredients: [],
        information: '',
        nextDrink: false,
        score: 0,
        step: 1,
        clickedIngredients: [],
        newGame: false
    }
    ///metoda na klikanie składników
    handleClick = (e) => {
        const ingredient = e.currentTarget;
        this.setState({
            allIngredients: this.state.allIngredients.filter((val) => val != ingredient.textContent),
            clickedIngredients: [...this.state.clickedIngredients, ingredient.textContent]
        })
        console.log(this.state.clickedIngredients);
    }
    handleNextClick = (e) => {
        this.setState({
            allIngredients: [...this.state.allIngredients, e.currentTarget.textContent],
            clickedIngredients: this.state.clickedIngredients.filter((val) => val != e.currentTarget.textContent)
        })
    }
    ///metoda , która uruchamia się po kliknięciu w przycisk shake it
    shakeIt = () => {

        //pobieram ze stata prawidłowe skłądniki i zaczynam porównywać tablice
        const rightIngredients = this.state.rightIngredients;
        let rightAnswers = [];
        //jeżeli liczba składników się zgadza
        if (this.state.clickedIngredients.length === rightIngredients.length) {
            for (let i = 0; i < rightIngredients.length; i++) {
                for (let j = 0; j < this.state.clickedIngredients.length; j++) {
                    if (rightIngredients[i] == this.state.clickedIngredients[j]) {
                        rightAnswers.push(this.state.clickedIngredients[j]);
                    }
                }
            }
            //jeżeli skłdniki się zgadzają to wygrana i pojawia się zdjęcie drinka
            if (rightAnswers.length === rightIngredients.length) {
                const picture = document.querySelector('.svg')
                const imgDrink = document.createElement('img');
                imgDrink.src = this.state.randomDrinkPictureAdress;
                imgDrink.classList.add('imgDrink');
                picture.appendChild(imgDrink);
                document.querySelectorAll('.svg .draggable').forEach((e) => e.style.display = "none");

                let info = <p>Good job! Prepare <span>next</span> drink</p>

                this.setState({
                    information: info,
                    score: this.state.score + 1,
                })
            }
            //jeżeli się nie zgadzają to przegrana i zniakają
            else {
                // document.querySelector('.svg').classList.add('wrong');
                const picture = document.querySelector('.svg')
                const imgDrink = document.createElement('img');
                imgDrink.src = 'https://cdn.pixabay.com/photo/2016/09/07/10/37/kermit-1651325_960_720.jpg';
                imgDrink.classList.add('imgDrink');
                picture.appendChild(imgDrink);
                document.querySelectorAll('.svg .draggable').forEach((e) => e.style.display = "none");
                let info = <p>Upsss! Try again with <span>next</span> drink</p>
                this.setState({
                    information: info,

                })
            }
            document.querySelector('.nextDrink').style.display = "block";
            document.querySelector('.shakeIt').style.display = "none";
            if (this.state.step == 10) {
                document.querySelector('.nextDrink').textContent = "The end"
            }

        } else if (this.state.clickedIngredients.length < rightIngredients.length) {
            let info = <p>not enough ingredients to create <span> {this.state.randomDrinkName}</span> drink</p>
            this.setState({
                information: info,
            })
        } else if (this.state.clickedIngredients.length > rightIngredients.length) {
            let info = <p>too many ingredients to create <span> {this.state.randomDrinkName}</span> drink</p>
            this.setState({
                information: info,
            })
        }
    }

    //po kliknięciu next Drink odpala się metoda z kolejnym drinkiem 
    nextDrink = (e) => {
        if (this.state.step == 10) {
            ///koniec gry
            console.log('game over');
            document.querySelector('.mainBoard').style.display = "none";
            document.querySelector('.gameOver').style.display = "block";

        } else {

            document.querySelector('.svg .imgDrink').remove();
            document.querySelector('.shakeIt').style.display = "block";

            let randomNumberNext = Math.floor((Math.random() * (drinks.length - 1)));
            let repeat = true;
            while (repeat) {
                repeat = false;
                for (let i = 0; i < this.state.allNumbers.length; i++) {
                    if (randomNumberNext === this.state.allNumbers[i]) {
                        console.log('powtórka');
                        randomNumberNext = Math.floor((Math.random() * (drinks.length - 1)));
                        repeat = true;
                    }
                }
            }
            console.log(randomNumberNext)


            this.setState({
                randomDrinkName: drinks[randomNumberNext].strDrink,
                randomDrinkPictureAdress: drinks[randomNumberNext].strDrinkThumb,
                rightIngredients: drinks[randomNumberNext].strIngredients.sort(),
                step: this.state.step + 1,
                information: '',
                nextDrink: true,
                clickedIngredients: [],
                allNumbers: [...this.state.allNumbers, randomNumberNext]

            })

            e.currentTarget.style.display = "none";
        }
    }
    componentDidUpdate() {
        console.log('dokonała się zmiana')
        if (this.state.nextDrink) {
            this.createIngredients();
            document.querySelector('.svg').classList.remove('wrong');
            this.setState({
                nextDrink: false,

            })
        }
        if (this.state.newGame) {
            this.createIngredients();
            this.createBoard();
            document.querySelector('.gameOver').style.display = "none";
            document.querySelector('.mainBoard').style.display = "flex";
            this.setState({
                newGame: false,
            })
            document.querySelector('.svg .imgDrink').remove();
            document.querySelector('.nextDrink').style.display = "none";
            document.querySelector('.nextDrink').textContent = "Next drink";
            document.querySelector('.shakeIt').style.display = "block";
        }
        if (this.state.information === "") {
            let info = <p>Choose right ingredients needed to create <span>{this.state.randomDrinkName}</span> drink and put it into shaker. Next <span>shake it </span> and taste it!</p>;
            this.setState({
                information: info,
            })
        }
    }
    newGame = () => {
        const randomNumber = Math.floor((Math.random() * (drinks.length - 1)));
        this.setState({
            allNumbers: [randomNumber],
            randomDrinkName: drinks[randomNumber].strDrink,
            rightIngredients: drinks[randomNumber].strIngredients.sort(),
            randomDrinkPictureAdress: drinks[randomNumber].strDrinkThumb,
            allIngredients: [],
            information: '',
            nextDrink: false,
            score: 0,
            step: 1,
            clickedIngredients: [],
            newGame: true,

        })


    }
    createBoard = () => {
        return (
            <>
                <div className="barman">
                    <div className="gameBoard center">
                        <div className="titleDrink">
                            <h2>{this.state.randomDrinkName}</h2>

                            <div id='dr1'>
                                <div className="allIngredients">
                                    {this.state.allIngredients.map((e, id) => {
                                        let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                                        return (<div key={id} className="ingredient" onClick={this.handleClick}>
                                            <img src={adress} alt={e} />
                                            <p>{e}</p>
                                        </div>);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="mainBoard">

                            <div className="instructions">
                                {this.state.information}
                            </div>
                            <div id='dr2'>
                                <div className="svg">
                                    {this.state.clickedIngredients.map((e, id) => {
                                        let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                                        return (<div key={id} className="ingredient draggable" onClick={this.handleNextClick}>
                                            <img src={adress} alt={e} />
                                            <p>{e}</p>
                                        </div>);
                                    })}
                                </div>
                            </div>
                            <div className="scoreButton">

                                <div className="score">
                                    <p>DRINK NR: <span>{this.state.step}</span></p>
                                    <p>SCORE: <span>{this.state.score}</span>/10</p>
                                </div>
                                <button className='shakeIt' onClick={this.shakeIt}>Shake It</button>
                                <button className='nextDrink' style={{ display: "none" }} onClick={this.nextDrink}>Next drink</button>
                            </div>
                        </div>
                        <div className="gameOver center" style={{ display: "none" }}>
                            <h1>GAME OVER</h1>
                            <p>Your score is <span>{this.state.score} points</span> .</p>
                            <button onClick={this.newGame}>Try again</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    createIngredients = () => {
        this.setState({
            allIngredients: [],
            droppedIngredients: document.querySelectorAll('#dr2 .ingredient'),

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
    render() {
        const info = <p>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
        return (<>
            {this.createBoard()}
            <Footer info={info} />
        </>
        )
    }
    componentDidMount() {
        this.createIngredients();
    }
}