import React from 'react';
import drinks from './drinks';
import Footer from './footer.jsx';

let randomNumber = Math.floor((Math.random() * (drinks.length - 1)));
export default class GameSetConeser extends React.Component {
    state = {
        ingredients: drinks[randomNumber].strIngredients.sort(),
        rightAnswer: drinks[randomNumber].strDrink,
        answers: [],
        score: 0,
        step: 1,
        instruction: '',
        next: false,
        newGame: false,
        allNumbers: [randomNumber],
    }
    handleClick = (e) => {
        console.log(e.currentTarget)
        e.currentTarget.classList.toggle('checked');

    }
    tryIt = () => {

        const checked = document.querySelectorAll('.checked');
        if (checked.length > 1) {
            let info = <p>choose only one <span>drink</span></p>
            this.setState({
                instruction: info,
            })
        } else if (checked.length === 1) {

            if (checked[0].textContent == this.state.rightAnswer) {
                if (this.state.step == 10) {
                    let info = <p>Good job!</p>
                    this.setState({
                        instruction: info,
                        score: this.state.score + 1,
                    })
                } else {
                    let info = <p>Good job! Try to guess <span>next</span> drink</p>
                    this.setState({
                        instruction: info,
                        score: this.state.score + 1,
                    })
                }
                checked.forEach(e => e.classList.add('good'));
                document.querySelector('.tryIt').style.display = "none";
                document.querySelector('.next').style.display = "block";
                if (this.state.step == 10) {
                    document.querySelector('.next').textContent = "End";

                }

            } else {
                if (this.state.step == 10) {
                    let info = <p>Upsss!</p>
                    this.setState({
                        instruction: info,
                    })
                } else {
                    let info = <p>Upsss! Try again with <span>next</span> drink</p>
                    this.setState({
                        instruction: info,
                    })
                }

                checked.forEach(e => e.classList.add('wrong'))
                document.querySelector('.tryIt').style.display = "none";
                document.querySelector('.next').style.display = "block";
                if (this.state.step == 10) {
                    document.querySelector('.next').textContent = "End";

                }
            }
        }

    }

    createGameSet = () => {
        let allDrinks = [...drinks];
        let allAnswers = [this.state.rightAnswer];

        while (4 - allAnswers.length != 0) {
            let diferent = true;
            let random = Math.floor((Math.random() * (allDrinks.length - 1)));
            for (let i = 0; i < allAnswers.length; i++) {

                if (allDrinks[random].strDrink == allAnswers[i]) {
                    diferent = false;
                }
            }
            if (diferent) {
                allAnswers = [...allAnswers, allDrinks[random].strDrink]
                allDrinks = allDrinks.filter((e) => {
                    return (allDrinks[random] != e);
                })
            }
        }
        this.setState({
            answers: allAnswers.sort()
        })
    }
    next = () => {
        if (this.state.step == 10) {

            document.querySelector('.coneserBoard').style.display = "none";
            document.querySelector('.gameOver').style.display = "flex";

        } else {
            let newRandomNumber = Math.floor((Math.random() * (drinks.length - 1)));
            let repeat = true;
            while (repeat) {
                repeat = false;
                for (let i = 0; i < this.state.allNumbers.length; i++) {
                    if (newRandomNumber === this.state.allNumbers[i]) {
                        console.log('powtórka');
                        newRandomNumber = Math.floor((Math.random() * (drinks.length - 1)));
                        repeat = true;
                    }
                }
            }
            this.setState({
                ingredients: drinks[newRandomNumber].strIngredients.sort(),
                rightAnswer: drinks[newRandomNumber].strDrink,
                answers: [],
                next: true,
                step: this.state.step + 1,
                instruction: '',
                allNumbers: [...this.state.allNumbers, newRandomNumber],
            })
            document.querySelector('.next').style.display = "none";
            document.querySelector('.tryIt').style.display = "block";
        }
    }
    newGame = () => {
        let randomNumber = Math.floor((Math.random() * (drinks.length - 1)));
        this.setState({
            ingredients: drinks[randomNumber].strIngredients.sort(),
            rightAnswer: drinks[randomNumber].strDrink,
            answers: [],
            score: 0,
            step: 1,
            instruction: '',
            next: false,
            newGame: true,
            allNumbers: [randomNumber],
        })
    }
    render() {
        return (
            <>
                <div className='coneser'>
                    <div className="header center">
                        <div className="instructions">{this.state.instruction}</div>

                        <div className="score">
                            <p>DRINK NR: <span>{this.state.step}</span></p>
                            <p>SCORE: <span>{this.state.score}</span>/10</p>
                        </div>
                    </div>
                    <div className="coneserBoard center">
                        <div className="coneserQuestion">
                            <ul>

                                {this.state.ingredients.map((e, id) => {
                                    const adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                                    return <li className="ingredientConeser" key={id}>
                                        <img src={adress} alt={e} />
                                        <p>{e}</p>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="coneserAnswers center">
                            <ul>
                                <h2>Drinks:</h2>
                                {this.state.answers.map((e, id) => {
                                    return <li key={id} onClick={this.handleClick}><p>{e}</p></li>
                                })}</ul>
                            <div className="buttons">
                                <button className="tryIt" onClick={this.tryIt}>Try It!</button>
                                <button className="next" onClick={this.next} style={{ display: "none" }}>Next</button>
                            </div>

                        </div>
                    </div>
                    <div className="gameOver center" style={{ display: "none" }}>
                        <h1>GAME OVER</h1>
                        <p>Your score is <span>{this.state.score} points</span> .</p>
                        <button onClick={this.newGame}>Try again</button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    componentDidUpdate() {
        if (this.state.next) {
            this.createGameSet();
            this.setState({
                next: false,
            })
        }
        if (this.state.newGame) {
            document.querySelector('.gameOver').style.display = "none";
            document.querySelector('.coneserBoard').style.display = "block";
            this.createGameSet();
            document.querySelector('.next').textContent = "Next";
            document.querySelector('.next').style.display = "none";
            document.querySelector('.tryIt').style.display = "block";
            this.setState({
                newGame: false,
            })
        }
        if (this.state.instruction === '') {
            let info = <p>Based on below ingredients <span>try</span> to guess right drink name</p>
            this.setState({
                instruction: info,
            })
        }
    }

    componentDidMount() {

        this.createGameSet()
    }
}