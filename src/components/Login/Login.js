import React, {useState} from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();

    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();


    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
        // console.log('email must include @')
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
        // console.log('password length must be greater than 6');
    }


    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <Card>
        <form onSubmit={(event)=>submitHandler(event)}>
            <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input
                        type='email'
                        id='email'
                        value={enteredEmail}
                        onChange={(event) => emailChangeHandler(event)}
                        onBlur={()=>validateEmailHandler()}
                    />
            </div>

            <div className={classes.control}>
                <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={enteredPassword}
                        onChange={(event) => passwordChangeHandler(event)}
                        onBlur={()=>validatePasswordHandler()}


                    />

            </div>

            <div className={classes.actions}>
            <Button type='submit' className={classes.btn}>login</Button>
            </div>

        </form>
        </Card>

    )
}
export default Login;