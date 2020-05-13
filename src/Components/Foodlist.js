import React, { Component } from 'react'
import foods from './../foods.json'
import Foodbox from './Foodbox';
import Addfood from './Addfood'
import Searchbar from './Searchbar';
import './../App.css';



export default class Foodlist extends Component {
    state = {
        foods: foods,
        showAdd: false,
        inputValue: '',
        filterFoods: foods,
        quantity: 0,
        totalCalories:0,
        listOfFoods: []

    }

    showAdd = () => {
        this.setState({ showAdd: !this.state.showAdd });
    };

    addOneFood = (newFoodObj) => {
        const foodCopy = [...this.state.foods];
        foodCopy.unshift(newFoodObj)

        this.setState({ foods: foodCopy })
    }

    filterOnChange = e => {

        this.setState({
            inputValue: e.target.value
        })
        let searchValue = e.target.value.toLowerCase()
        let filterFoods = [...this.state.foods]

        let filteredFoods = filterFoods.filter(food => food.name.toLowerCase().includes(searchValue))


        this.setState({
            filterFoods: filteredFoods
        })
    }

    sumTheTotal = (totalCalories,name, quantity) =>{
        console.log(quantity);
        let row = `· ${quantity-1} ${name} ${totalCalories} · `
        
        let listOfFoodsCopy = [...this.state.listOfFoods]
        listOfFoodsCopy.push(row)

        let newTotalCalories = this.state.totalCalories
        newTotalCalories += parseInt(totalCalories, 10)
        this.setState({
            listOfFoods: listOfFoodsCopy,
            totalCalories: newTotalCalories
        })
    }

    render() {
        return (
            <div className="centered">

                <h1 className="foodlisth1">Food List</h1>
                <button className="button centered" onClick={this.showAdd}>Add a Food</button>
                {
                    this.state.showAdd
                        ? <Addfood createFood={this.addOneFood} />
                        : null
                }
                <Searchbar filterOnChange={this.filterOnChange}
                    inputValue={this.state.inputValue} />
                <div className="list-add">
                <ul>
                    {
                        this.state.filterFoods.map((oneFood, index) => {
                            return (
                                <Foodbox
                                key={index}
                                {...oneFood}
                                quantityChange={this.quantityChange}
                                quantity={this.state.quantity}
                                sumTheTotal={this.sumTheTotal} />
                            );
                        })
                    }
                </ul>
                <div className="todaysFood">
                    <h1>Today's Food</h1>
                   
                    <ul id="listOfFoods">
                        {
                            this.state.listOfFoods.map((food,ind)=>{
                                return ( <li key={ind}> {food}</li> )
                            })
                        }
                    </ul>
                    <br/>
                    <h3> Total  {this.state.totalCalories} Cal.</h3>
                </div>
                </div>
            </div>
        )
    }
}
