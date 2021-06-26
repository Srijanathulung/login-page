import React from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

const Login = () => {
    return (
        <Card>
        <form>
            <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' />
            </div>

            <div className={classes.control}>
                <label htmlFor='password'>Password</label>
                <input type='password' />

            </div>

            <div className={classes.actions}>
            <Button type='submit' className={classes.btn}>login</Button>
            </div>

        </form>
        </Card>

    )
}
export default Login;