import React, {useState, useEffect} from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();

    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        setFormIsValid(
            enteredEmail.includes('@') && enteredPassword.trim().length>6
        )
    },
        [setFormIsValid, enteredEmail, enteredPassword] )
        // [ enteredEmail, enteredPassword] )
        // [] )
        // [setFormIsValid] )


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

        // setFormIsValid(
        //     event.target.value.includes('@') && enteredPassword.trim().length>6
        // )
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)

        // setFormIsValid(
        //     event.target.value.trim().length > 6 && enteredEmail.includes('@')
        //   );
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredEmail, enteredPassword);
        console.log('is logged in');
        console.log(enteredEmail, enteredPassword);
    }

    return (
        <Card className={classes.login}>
        <form onSubmit={(event)=>submitHandler(event)}>
            <div className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}>
              
            <label htmlFor='email'>Email</label>
            <input
                        type='email'
                        id='email'
                        value={enteredEmail}
                        onChange={(event) => emailChangeHandler(event)}
                        onBlur={()=>validateEmailHandler()}
                    />
            </div>

            <div className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}>
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
                    <Button
                        type='submit'
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        login
                    </Button>
            </div>

        </form>
        </Card>

    )
}
export default Login;