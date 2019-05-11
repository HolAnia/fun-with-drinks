import React from 'react';
import Footer from './footer.jsx'

export default class Question extends React.Component {
    state = {
        year: "",
        age: 0
    }
    handleChange = (e) => {

        this.setState({
            year: e.currentTarget.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (Number(this.state.year) < 1920) {
            alert("enter real year of birth!");
        } else {
            this.setState({
                age: new Date().getFullYear() - Number(this.state.year),
            })
        }


    }
    render() {
        const info = <p><a target="_blank" href="https://www.vexels.com/vectors/preview/144120/neon-cocktails-sign"> Neon cocktails sign </a></p>;
        return (
            <>
                <div>
                    <form className="question" onSubmit={this.handleSubmit}>
                        <label >
                            <h1>Please enter the year of birth:</h1>
                            <input className="yearQuestion" type="number" onChange={this.handleChange} value={this.state.year} />
                            <button type='submit'>confirm</button>
                        </label>
                        <div className="logo"></div>
                    </form>
                </div>
                <Footer info={info} />
            </>
        )
    }

    componentDidUpdate() {
        if (this.state.age > 0) {
            if (typeof this.props.passClick === 'function') {
                this.props.passClick(this.state.age);
            }
            this.setState({
                age: 0,
            })
        }
    }
}