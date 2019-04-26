import React from 'react';
import drinks from './drinks';
import ingredients from './ingredients';
import Footer from './footer.jsx';

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
let randomNumber = Math.floor((Math.random() * drinks.length - 1));
let randomDrink = drinks[randomNumber].strDrink;
let randomDrinkPictureAdress = drinks[randomNumber].strDrinkThumb;

class Ingredient extends React.Component{
    render(){
        return(
            <div className="ingredient" onClick={this.props.handleClick}>
                <img src={this.props.ingredientAdress} alt={this.props.ingredientTitle}/>
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
                    
                    // if (rightIngredients[i] == checked[j].getAttribute('alt')) {
                    //     checked[j].classList.remove('checked');
                    //     checked[j].classList.add('green')
                    //     rightAnswers.push(checked[j]);
                    // }
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
                {/* <img src={this.state.randomDrinkPictureAdress} alt={this.state.randomDrinkName} /> */}
                
                <div className="allIngredients">
                    {this.state.allIngredients.map((e, id) => {
                        let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                        return <Ingredient key={id} ingredientTitle={e} ingredientAdress={adress} handleClick={this.handleClick}/>
                        })}
                        </div> 
                </div>
                <div className="mainBoard">
                <div className="instructions">
                <p>instrukcja</p></div>
                <svg width="400px" height="450px">
                    <g>
	                    <g>
		                    <path style={{fill: '#070707'}} d="M322.641,143.952c-2.389-6.732-7.648-12.053-14.352-14.52c-2.213-32.11-20.323-60.991-48.264-76.968V8
			                c0-4.418-3.582-8-8-8h-80c-4.418,0-8,3.582-8,8v44.728c-27.561,16.084-45.424,44.718-47.752,76.544
			                c-12.554,4.253-19.283,17.878-15.029,30.432c2.368,6.989,7.819,12.5,14.781,14.944v28.632c0.003,8.893,0.709,17.771,2.112,26.552
			                l29.992,187.432c0.621,3.88,3.967,6.734,7.896,6.736h112c3.929-0.002,7.275-2.856,7.896-6.736l29.992-187.432
			                c1.403-8.781,2.109-17.659,2.112-26.552v-28.632C320.538,170.208,327.081,156.465,322.641,143.952z M180.025,16h64v29.176
			                c-20.71-7.345-43.324-7.294-64,0.144V16z M178.305,63.24V63.2c40.217-18.761,88.027-1.367,106.788,38.849
			                c3.819,8.188,6.231,16.961,7.132,25.951h-159.8C135.322,99.868,152.726,75.302,178.305,63.24z M292.025,203.28
			                c-0.002,8.038-0.639,16.063-1.904,24L261.201,408h-98.352l-28.92-180.704c-1.265-7.937-1.902-15.962-1.904-24V176h160V203.28z
			                M300.617,160H123.433c-4.418,0-8-3.582-8-8s3.582-8,8-8h177.184c4.418,0,8,3.582,8,8S305.036,160,300.617,160z"/>
	                    </g>
                    </g>

                </svg>
                <div className="score"><p>{this.state.score}/10</p></div>
                </div>
                <button onClick={this.shakeIt}>Shake It</button>
                </div>
                </div>
             <Footer/>
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