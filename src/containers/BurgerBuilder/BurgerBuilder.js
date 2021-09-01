import React, { Component } from 'react';
import {connect} from "react-redux";
import Au from '../../hoc/Au';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spiner from "../../components/UI/Spinner/Spiner";
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios-order";
import * as actionTypes from '../../store/action';

// import { response } from 'express'; 

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7

}

class BurgerBuilder extends Component {
  state = { 
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get("https://react-burger-bilder-ef6cc-default-rtdb.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch(error => {
    //     this.setState({ error: true })
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)

    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }
  purchaseContinueHandler = () => {
    // alert("You Continue!");

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });

    this.props.history.push('/checkout');
  }
  render() {
    const disableInfo = {
      ...this.props.ings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spiner />;
    if (this.props.ings) {
      burger = (
        <Au>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Au>);
      orderSummary = <OrderSummary ingredients={this.props.ings}
        price={this.props.price}
        pusrchaseCanceled={this.purchaseCancelHandler}
        pusrchaseContinued={this.purchaseContinueHandler} />;
    }
    if (this.state.loading) {
      orderSummary = <Spiner />;
    }
    return (
      <Au>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </Au>

    );
  }
}

const mapStateToProps = state =>{
  return {
      ings: state.ingredients,
      price:state.totalPrice
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENTS,ingredientName:ingName}),
    
    onIngredientRemove: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENTS,ingredientName:ingName})
  }
}
export default connect (mapStateToProps,mapDispatchToProps) (WithErrorHandler(BurgerBuilder, axios));