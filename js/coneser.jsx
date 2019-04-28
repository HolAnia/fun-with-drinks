import React from 'react';
import drinks from './drinks';
import Footer from './footer.jsx';

let randomNumber = Math.floor((Math.random() * drinks.length - 1));

export default class GameSetConeser extends React.Component {
    state = {
        ingredients: drinks[randomNumber].strIngredients.sort(),
        rightAnswer: drinks[randomNumber].strDrink,
        answers: [],
        score: 0
    }
    handleClick = (e) => {

        e.currentTarget.classList.toggle('checked');

    }
    tryIt = () => {
        const checked = document.querySelectorAll('.checked');
        const allButtons = document.querySelectorAll('button');

        if (checked.length > 1) {
            console.log('zaznacz tylko jedną odpowiedź')
        } else if (checked.length === 1) {
            console.log("sprawdzam")
            if (checked[0].textContent == this.state.rightAnswer) {
                console.log('brawo!')
                checked[0].classList.add('green');
                allButtons.forEach((e) => {
                    return e.setAttribute('disabled', 'disabled');
                })
                checked[0].classList.add('green');
                checked[0].removeAttribute('disabled')
            } else {
                console.log('źle!')
                checked[0].classList.add('red');
                allButtons.forEach((e) => {
                    return e.setAttribute('disabled', 'disabled');
                });
                checked[0].removeAttribute('disabled');
                for (let i = 0; i < allButtons.length; i++) {
                    if (allButtons[i].innerText === this.state.rightAnswer) {
                        allButtons[i].classList.add('green');
                    }
                }
            }
        }
    }
    render() {
        console.log(this.state.ingredients)
        return (
            <>
                <div className='coneser'>
                    <div className="header center">
                        <div className="instructions"><p>Instrukcja</p></div>
                        <div className="logo"></div>
                        <div className="score"><p>SCORE: <span>{this.state.score}</span>/10</p></div>
                    </div>
                    <div className="coneserBoard center">

                        <ul>
                            {this.state.ingredients.map((e, id) => {
                                return <li key={id}>{e}</li>
                            })}
                        </ul>

                        <div className="coneserAnswers center">
                            <ul>{this.state.answers.map((e, id) => {
                                return <li key={id} onClick={this.handleClick}>{e}</li>
                            })}</ul>
                            <button onClick={this.tryIt}>Try It!</button>
                        </div>
                    </div>

                </div>
                <Footer />
            </>
        )
    }
    componentDidMount() {
        let allDrinks = [...drinks];
        let allAnswers = [this.state.rightAnswer];
        console.log(allAnswers.length);
        console.log(allDrinks);
        while (4 - allAnswers.length != 0) {
            let diferent = true;
            let random = Math.floor((Math.random() * allDrinks.length - 1));
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
            console.log(allAnswers);
        }
        this.setState({
            answers: allAnswers.sort()
        })

    }
}