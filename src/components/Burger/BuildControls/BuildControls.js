import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p className={classes.PriceColor}><strong>Current Price: ${props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl, index) => (
            <BuildControl
                key={index}
                label={ctrl.label}
                add={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)} />
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}>ORDER NOW!</button>
    </div>
)

export default buildControls;