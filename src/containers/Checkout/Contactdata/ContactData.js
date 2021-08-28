import React, { Component } from "react";
import ContactDataCss from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spiner";
import axios from '../../../axios-order';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading:false
  }
  OrderHandler = (event)=>{
    event.preventDefault();
     this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.props.price,
      customer: {
        name: "kaleem",
        address: {
          street: "test street",
          zipCode: '43124',
          country: "germany"
        },
        email: "asdf@dummy.com"
      },
      deliveryMethood: "fastest"
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false});
      });
    console.log(this.props.ingredients);

  }

  render() {
    let form =( <form>
      <input className="Input" type="text" name="name" placeholder="Your name"></input>
      <input className="Input" type="email" name="email" placeholder="Your mail"></input>
      <input className="Input" type="text" name="street" placeholder="Your street"></input>
      <input className="Input" type="text" name="postal" placeholder="Your postal code"></input>
    </form>);
    if(this.state.loading){
        form=<Spinner/>
    }
    return (
      <div className="ContactData">
        <h4>Enter Your Contact Data</h4>
         {form}
        <Button btnType="Success" clicked={this.OrderHandler}>Order</Button>
      </div>
    );
  }
}
export default ContactData;
