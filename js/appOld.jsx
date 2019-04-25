import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import drinks from './drinks';
import ingredients from './ingredients';
import style from '../scss/style.scss';

let randomNumber = Math.floor((Math.random() * drinks.length - 1));
let randomDrink = drinks[randomNumber].strDrink;
let randomDrinkPictureAdress = drinks[randomNumber].strDrinkThumb;

class GameSetConeser extends React.Component {
    state = {
        ingredients: drinks[randomNumber].strIngredients.sort(),
        rightAnswer: drinks[randomNumber].strDrink,
        answers: []
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
            <div>
                <ul>
                    {this.state.ingredients.map((e, id) => {
                        return <li key={id}>{e}</li>
                    })}
                </ul>
                <ul>{this.state.answers.map((e, id) => {
                    return <button key={id} onClick={this.handleClick}>{e}</button>
                })}</ul>
                <button onClick={this.tryIt}>Try It!</button>
            </div>
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

class GameSetBarman extends React.Component {
    state = {
        randomDrink: randomDrink,
        ingredients: drinks[randomNumber].strIngredients.sort(),
        randomDrinkPictureAdress: randomDrinkPictureAdress,
        allIngredients: [],

    }
    handleClick = (e) => {
        e.currentTarget.classList.toggle('checked');
    }
    shakeIt = () => {
        const checked = document.querySelectorAll('.checked');
        const ingredients = this.state.ingredients;
        console.log(ingredients)
        console.log(checked);
        let rightAnsers = [];
        console.log(checked.length);

        if (checked.length === ingredients.length) {
            for (let i = 0; i < ingredients.length; i++) {
                let good = false;
                let bad = '';
                for (let j = 0; j < checked.length; j++) {
                    console.log(good)
                    if (ingredients[i] == checked[j].textContent) {
                        console.log(ingredients[i], checked[j].textContent)
                        checked[j].classList.remove('checked');
                        checked[j].classList.add('green')
                        good = true;
                        console.log(good);
                        rightAnsers.push(checked[j]);
                    }

                }
            }

            if (rightAnsers.length === ingredients.length) {
                console.log('gratulacje!')
            } else {
                console.log('przegrałeś')
            }
        } else if (checked.length < this.state.ingredients.length) {
            console.log('za mało składników')
        } else if (checked.length > this.state.ingredients.length) {
            console.log('wybrałeś za dużo składników')
        }

    }
    render() {
        return (
            <div>
                <h2>{this.state.randomDrink}</h2>
                <img src={this.state.randomDrinkPictureAdress} alt={this.state.randomDrink} />
                {this.state.allIngredients.map((e, id) => {
                    let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                    return <div key={e + id}><button key={id} onClick={this.handleClick}>{e}</button><img src={adress} alt={e} key={e} /></div>
                })}
                <button onClick={this.shakeIt}>Shake It</button>
            </div>
        )
    }
    componentDidMount() {

        let mainIngredients = [...ingredients];

        let allIngredients = [...this.state.ingredients];

        while (10 - allIngredients.length != 0) {
            let diferent = true;
            let random = Math.floor((Math.random() * (mainIngredients.length - 1)));
            console.log(random);
            // for (let j = 0; j < this.state.ingredients.length; j++) {
            //     if (mainIngredients[random] == this.state.ingredients[j]) {
            //         diferent = false;
            //     }
            // }
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
            console.log(mainIngredients);
        }
        this.setState({
            allIngredients: allIngredients.sort()
        })


    }
}

class App extends React.Component {
    state = {
        text: "",
        result: [],
        ingredients: "",
        name: []
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleIngredients = (e) => {
        this.setState({
            ingredients: e.target.value
        })
    }
    handleName = (e) => {
        axios.get(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${this.state.ingredients}`)
            .then(res => {

                this.setState({
                    name: res.data.drinks.map((e, id) => {
                        return <li key={id}>{e.strDrink}</li>
                    })
                })
            })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.text}`)
            .then(res => {

                this.setState({
                    result: res.data.drinks.map((e, id) => {
                        return <div><img key={id} src={e.strDrinkThumb} />
                            <p>{e.strDrink}</p></div>
                    })
                })
            })

    }

    render() {
        // console.log(drinks);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.text} onChange={this.handleChange} />
                    <button type='submit'>Wyszukaj</button>
                    <input type="text" value={this.state.ingredients} onChange={this.handleIngredients} placeholder="składniki" />
                    <button onClick={this.handleName}>Szukaj</button>

                </form>
                <div>
                    {(this.state.result.length > 0) ? this.state.result : ''}
                    <ul>
                        {this.state.name}
                    </ul>
                </div>
            </div>
        )
    }
    // componentDidMount() {
    //     axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
    //         .then(res => {
    //             console.log(res.data.drinks.map((e) => {
    //                 return e.strDrink
    //             }))
    //         })
    // }
}

document.addEventListener('DOMContentLoaded', function () {
    let randomNumber = Math.floor(Math.random() * drinks.length);
    let randomDrink = drinks[randomNumber].strDrink;
    let randomDrinkPictureAdress = drinks[randomNumber].strDrinkThumb;
    // console.log(ingredients.sort());
    // console.log(randomDrink)
    ReactDOM.render(
        <GameSetBarman />,
        document.getElementById('app')
    );
});