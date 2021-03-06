import React, { Component } from 'react'

export default class Foodbox extends Component {

    state ={
        quantity: '',
        totalCalories: ''
    }

    quantityChange = e =>{
        console.log(e.target.value);
        this.setState({
            quantity:e.target.value,
            totalCalories:this.state.quantity * this.props.calories 
        })
        console.log(this.state.totalCalories);
    }
   

    render() {
        return (
            <div className="box">
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={this.props.image} alt="a" />
                  
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{this.props.name}</strong> <br />
                    <small>{this.props.calories}</small>
                  </p>
                </div>
              </div>
              <div className="media-right">
                <div className="field has-addons">
                  <div className="control">
                    <input className="input inpw" type="number"
                     onChange={this.quantityChange}
                      value={this.state.quantity} />
                  </div>
                  <div className="control">
                    <button 
                    onClick={()=>this.props.sumTheTotal(this.state.totalCalories,this.props.name, this.state.quantity)} className="button is-info">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
    }
}

