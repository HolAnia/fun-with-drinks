import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import drinks from './drinks'
import ingredients from './ingredients';

let randomNumber = Math.floor((Math.random() * drinks.length) - 1);
let randomDrink = drinks[randomNumber].strDrink;
let randomDrinkPictureAdress = drinks[randomNumber].strDrinkThumb;


class GameSet extends React.Component {
    state = {
        randomDrink: randomDrink,
        ingredients: drinks[randomNumber].strIngredients.sort(),
        randomDrinkPictureAdress: randomDrinkPictureAdress,
        allIngredients: [],

    }
    render() {
        return (
            <div>
                <h2>{this.state.randomDrink}</h2>
                <img src={this.state.randomDrinkPictureAdress} alt={this.state.randomDrink} />
                <ul>{this.state.allIngredients.map((e, id) => {
                    let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                    return <li key={id} style={{ listStyle: "none" }}>{e}<img src={adress} alt={e} /></li>
                })}</ul>
            </div>
        )
    }
    componentDidMount() {

        let mainIngredients = [...ingredients];

        let allIngredients = [...this.state.ingredients];

        while (10 - allIngredients.length != 0) {
            let diferent = true;
            let random = Math.floor((Math.random() * mainIngredients.length) - 1);
            console.log(random);
            for (let j = 0; j < this.state.ingredients.length; j++) {
                if (mainIngredients[random] == this.state.ingredients[j]) {
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
        <GameSet />,
        document.getElementById('app')
    );
});