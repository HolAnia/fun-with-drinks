import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import drinks from './drinks';
import ingredients from './ingredients';
import style from '../scss/style/main.scss';
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

class GameSetBarman extends React.Component {
    state = {
        randomDrinkName: randomDrink,
        rightIngredients: drinks[randomNumber].strIngredients.sort(),
        randomDrinkPictureAdress: randomDrinkPictureAdress,
        allIngredients: [],
        information: ''
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
            <div className="center">
                <h2>{this.state.randomDrinkName}</h2>
                <div><p>{this.state.information}</p></div>
                {/* <img src={this.state.randomDrinkPictureAdress} alt={this.state.randomDrinkName} /> */}
                <div className="allIngredients">
{this.state.allIngredients.map((e, id) => {
    let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
    return <Ingredient key={id} ingredientTitle={e} ingredientAdress={adress} handleClick={this.handleClick}/>
})} 

                    {/* {this.state.allIngredients.map((e, id) => {
                        let adress = `https://www.thecocktaildb.com/images/ingredients/${e}-small.png`;
                        return <div className="ingredient" key={e + id}><img onClick={this.handleClick} src={adress} alt={e} key={e} /><p>{e}</p></div>
                    })} */}
                </div>
                <svg 
	 width="300px" height="300px" viewBox="0 0 612 612" >
<g>
	<g>
		<g>
			<path  d="M578.358,53.829C578.358,2.607,351.444,0,305.957,0C260.499,0,33.642,2.607,33.642,53.829c0,1.999,0.463,3.896,1.13,5.75
				l-1.014,0.13l63.619,501.403h0.029C99.359,583.775,126.659,612,305.972,612c131.9,0,187.9-14.729,191.174-50.454l0,0
				l80.896-501.374l-0.984-0.159C577.823,58.014,578.358,55.972,578.358,53.829z M305.957,585.918
				c-174.781,0-182.63-27.442-182.63-27.718c0-0.276,7.849-27.776,182.63-27.776c157.431,0,165.411,23.144,165.411,27.776
				C471.368,562.806,463.403,585.918,305.957,585.918z M476.394,526.456c-27.037-15.351-81.389-22.099-170.422-22.099
				c-108.498,0-161.298,10.34-186.54,23.531L62.75,81.243c62.706,24.822,207.843,26.4,243.207,26.4
				c35.19,0,178.923-1.579,242.194-26.009L476.394,526.456z M305.957,81.576c-132.306,0-222.324-15.466-243.279-27.747
				c20.97-12.28,110.988-27.747,243.279-27.747c132.335,0,222.382,15.467,243.353,27.747
				C528.354,66.095,438.306,81.576,305.957,81.576z"/>
			<path d="M138.056,179.009c-7.139,0.898-12.223,7.415-11.339,14.54l29.803,240.702c0.826,6.618,6.43,11.455,12.932,11.455
				c0.536,0,1.072-0.06,1.607-0.116c7.14-0.884,12.223-7.386,11.339-14.54l-29.803-240.701
				C151.698,183.194,145.123,178.357,138.056,179.009z"/>
		</g>
	</g>
</g>

</svg>
                <button onClick={this.shakeIt}>Shake It</button>
            </div>
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

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <GameSetBarman />,
        document.getElementById('app')
    );
});