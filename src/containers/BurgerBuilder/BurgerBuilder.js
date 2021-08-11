import React, { Component } from 'react';
import Au from '../../hoc/Au';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7

}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice:4,
    purchasable:false
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
    .map(igkey => {
      return ingredients[igkey]
    })
    .reduce((sum,el) =>{
      return sum + el;
    },0)
    
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {    
     const oldCount=this.state.ingredients[type];
     const updatedCount=oldCount + 1;
     const updatedIngredients = {
       ...this.state.ingredients
     };
     updatedIngredients[type] = updatedCount;

     const priceAddition = INGREDIENT_PRICES[type];
     const oldPrice =this.state.totalPrice;
     const newPrice =oldPrice + priceAddition;
     this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
     this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {    
    const oldCount=this.state.ingredients[type];
    if(oldCount <=0){
      return;
    }
    const updatedCount=oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice =this.state.totalPrice;
    const newPrice =oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }
  render() {
    const disableInfo ={
        ...this.state.ingredients
    };
    for (let key in disableInfo){
      disableInfo[key] = disableInfo [key] <= 0
    }
    return (
      <Au>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disableInfo}
        purchasable={this.state.purchasable}
        price={this.state.totalPrice}

        />
      </Au>

    );
  }
}
export default BurgerBuilder;