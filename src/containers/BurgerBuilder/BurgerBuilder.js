import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    lettuce: 0.50,
    cheese: 0.40,
    meat: 1.30,
    bacon: 0.60
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        // console.log(Object.keys(ingredients).map(igKey => ingredients[igKey]))

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({ purchaseable: sum > 0 })
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        console.log(type)
        console.log(this.state.ingredients[type])
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.updatePurchaseState(updatedIngredients);
    }


    // toggleModal = () => {
    //     this.setState({ modalIsVisible: !this.state.modalIsVisible })

    //     if (this.state.modalIsVisible) {
    //         const modal = (
    //             <Modal>
    //                 <OrderSummary ingredients={this.state.ingredients} />
    //             </Modal>
    //         )
    //         return modal;
    //     } else {
    //         return null;
    //     }
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('Send information to server!')
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />

            </Fragment>
        )
    }
};

export default BurgerBuilder;