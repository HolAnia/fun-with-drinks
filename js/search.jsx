import React from 'react';
import axios from 'axios';
import Footer from './footer.jsx';

const Drink = (props) => {
    return (
        <div className='drink'>
            <h3>{props.title} <span>({props.alcohol})</span></h3>
            <div className="fotoIng">
                <img src={props.picture} alt={props.title} />
                <ul>
                    <span>Ingredients:</span>
                    {props.ingredients.map((e, id) => {
                        if (e.length > 0) { return <li key={id}>{e}</li> }
                    })}
                </ul>
            </div>
            <span>Instruction:</span> <p>{props.description}</p>

        </div>
    )
}

export default class Search extends React.Component {
    state = {
        name: "",
        resultName: [],
        resultIngredients: [],
        select: "name"
    }
    handleChange = (e) => {
        if (this.state.select === "ingredients") {
            this.setState({
                name: e.target.value
            })
        } else if (this.state.select === "name") {
            this.setState({
                name: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let allresults = [];
        let ingredientsResult = [];

        if (this.state.select === "name") {
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.name}`)
                .then(res => {
                    const drinks = res.data.drinks;
                    for (let i = 0; i < drinks.length; i++) {
                        allresults.push({
                            title: drinks[i].strDrink,
                            picture: drinks[i].strDrinkThumb,
                            ingredients: [drinks[i].strIngredient1, drinks[i].strIngredient2, drinks[i].strIngredient3, drinks[i].strIngredient4, drinks[i].strIngredient5, drinks[i].strIngredient6, drinks[i].strIngredient7, drinks[i].strIngredient8],
                            description: drinks[i].strInstructions,
                            alcohol: drinks[i].strAlcoholic
                        })
                    }
                    this.setState({
                        resultName: allresults
                    })
                })
        } else if (this.state.select === "ingredients") {

            axios.get(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${this.state.name}`)
                .then(res => {
                    const drinksByIngredient = res.data.drinks;
                    drinksByIngredient.map((e) => {

                        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.strDrink}`)
                            .then(res => {
                                const drinks = res.data.drinks;
                                for (let i = 0; i < drinks.length; i++) {
                                    ingredientsResult.push({
                                        title: drinks[i].strDrink,
                                        picture: drinks[i].strDrinkThumb,
                                        ingredients: [drinks[i].strIngredient1, drinks[i].strIngredient2, drinks[i].strIngredient3, drinks[i].strIngredient4, drinks[i].strIngredient5, drinks[i].strIngredient6, drinks[i].strIngredient7, drinks[i].strIngredient8],
                                        description: drinks[i].strInstructions,
                                        alcohol: drinks[i].strAlcoholic
                                    })
                                }

                            })
                    })
                    this.setState({
                        resultIngredients: ingredientsResult
                    })
                })
        }
    }
    handleSelectChange = (e) => {
        this.setState({
            select: e.currentTarget.value,
            resultIngredients: [],
            resultName: [],
            name: '',
        })
    }
    render() {
        // console.log(this.state.resultIngredients)
        // console.log(this.state.resultIngredients.length)
        // console.log(this.state.resultName)
        console.log(this.state.resultName.length)
        return (
            <>
                <div className='search'>
                    <div className="logo"></div>

                    <form onSubmit={this.handleSubmit} >
                        <label >Find Your drink:
                    {/* <h2>Find Your drink:</h2> */}
                            <input type="text" value={this.state.name} onChange={this.handleChange} />
                            <select onChange={this.handleSelectChange}>
                                <option value="name">name</option>
                                <option value="ingredients">ingredients</option>
                            </select>
                            <button type='submit'>Wyszukaj</button>
                        </label>
                    </form>
                    <div className="drinksResult center">
                        {(this.state.resultIngredients.length > 0) ? this.state.resultIngredients.map((e, id) => {
                            console.log(e);
                            return (
                                <Drink key={id} title={e.title} picture={e.picture} ingredients={e.ingredients} description={e.description} alcohol={e.alcohol} />
                            )
                        }) : <div className="empty"></div>}
                        {/* {console.log(this.state.resultIngredients.length)} */}
                        {(this.state.resultName.length > 0) ? this.state.resultName.map((e, id) => {
                            console.log(e);
                            return (
                                <Drink key={id} title={e.title} picture={e.picture} ingredients={e.ingredients} description={e.description} alcohol={e.alcohol} />
                            )
                        }) : <div className="empty"></div>}



                    </div>
                </div>
                <Footer />
            </>
        )
    }
}