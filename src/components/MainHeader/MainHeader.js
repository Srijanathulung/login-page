import classes from './MainHeader.module.css'
import React from 'react';
import Navigation from './Navigation';

const MainHeader = (props) => {
    return (
            <header className={classes['main-header']}>
                <h1>This is a typical page</h1>
                <Navigation />
            </header> 
    )
}
export default MainHeader;