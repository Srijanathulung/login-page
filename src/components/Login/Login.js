import React, {useState, useEffect, useReducer} from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

//It is the reducer fn and it returns currentState which will be initialState for emailState in useReducer Hook
const emailReducer = (prevState, action) => {

    if (action.type === 'USER_INPUT') {
        return { value:action.val, isValid: action.val.includes('@')}
    }
    if (action.type === 'INPUT_BLUR') {
        return { value:prevState.value, isValid: prevState.value.includes('@') }
 
    }
    return { value:'', isValid: false}
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();

    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();

    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false
    })

    useEffect(() => {
        console.log('useEffect is running')

        return () => {
            console.log('CLEANUP')
        }
    },[])

    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         // console.log('checking validity');
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //         )
    //     },500);

    //     //this cleanup function doesnot run before the very first sideeffect execution.
    //     return () => {
    //         // console.log('Clean up function is called');
    //         clearTimeout(identifier);
    //     }
    // },
    //     // [setFormIsValid, enteredEmail, enteredPassword] )
    //     [ enteredEmail, enteredPassword] )
    //     // [] )
    //     // [setFormIsValid] )

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value)

        // setFormIsValid(
        //     event.target.value.includes('@') && enteredPassword.trim().length>6
        // )

        //we dispatched the action object
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length>6
        )
    }

    const validateEmailHandler = () => {
        // setEmailIsValid(enteredEmail.includes('@'));
        // console.log('email must include @')
        dispatchEmail({ type:'INPUT_BLUR'});
        
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)

        // setFormIsValid(
        //     event.target.value.trim().length > 6 && enteredEmail.includes('@')
        //   );
        setFormIsValid(
           emailState.isValid  &&  event.target.value.trim().length > 6
          );
    }

    
    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
        // console.log('password length must be greater than 6');
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // props.onLogin(enteredEmail, enteredPassword);
        props.onLogin(emailState.value, enteredPassword);
        console.log('is logged in');
        // console.log(enteredEmail, enteredPassword);
    }

    return (
        <Card className={classes.login}>
        <form onSubmit={(event)=>submitHandler(event)}>
            <div className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ''
          }`}>
              
            <label htmlFor='email'>Email</label>
            <input
                        type='email'
                        id='email'
                        value={emailState.value}
                        // value={enteredEmail}
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