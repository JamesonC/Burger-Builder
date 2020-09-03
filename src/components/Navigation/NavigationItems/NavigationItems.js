import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem link='/' >Checkout</NavigationItem>
        <NavigationItem link='https://github.com/JamesonC/Burger-Builder' target='_blank'>GitHub Repo</NavigationItem>
    </ul>
);

export default navigationItems;