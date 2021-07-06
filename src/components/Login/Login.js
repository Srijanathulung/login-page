import React, {useState, useEffect, useReducer, useContext, useRef} from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

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

const passwordReducer = (prevState, action) => {
    if (action.type === 'USER_PASSWORD') {
        return {value: action.val ,isValid: action.val.trim().length>6}
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: prevState.value, isValid:  prevState.value.trim().length>6}
    }
    return {value: '', isValid: false}
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();

    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();

    const [formIsValid, setFormIsValid] = useState(false);

    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer,
        {
            value: '',
            isValid: null
        })

    useEffect(() => {
        console.log('useEffect is running')

        return () => {
            console.log('CLEANUP')
        }
    }, [])
    
    //object destruction to pull out certain properties of object
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            // console.log('checking validity');
            setFormIsValid(
                emailIsValid && passwordIsValid
            )
        },500);

        //this cleanup function doesnot run before the very first sideeffect execution.
        return () => {
            // console.log('Clean up function is called');
            clearTimeout(identifier);
        }
    },
        // [setFormIsValid, enteredEmail, enteredPassword] )
        [ emailIsValid, passwordIsValid] )
        // [] )
        // [setFormIsValid] )

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value)

        // setFormIsValid(
        //     event.target.value.includes('@') && enteredPassword.trim().length>6
        // )

        //we dispatched the action object
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
        // setFormIsValid(
        //     // event.target.value.includes('@') && enteredPassword.trim().length>6
        //     event.target.value.includes('@') && passwordState.isValid
        // )
    }

    const validateEmailHandler = () => {
        // setEmailIsValid(enteredEmail.includes('@'));
        // console.log('email must include @')
        dispatchEmail({ type:'INPUT_BLUR'});
        
    }

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value)

        // setFormIsValid(
        //     event.target.value.trim().length > 6 && enteredEmail.includes('@')
        //   );
        dispatchPassword({type:'USER_PASSWORD', val: event.target.value})
        // setFormIsValid(
        //    emailState.isValid  &&  event.target.value.trim().length > 6
        //   );
    }

    
    const validatePasswordHandler = () => {
        // setPasswordIsValid(passwordState.isValid);
        // console.log('password length must be greater than 6');
        dispatchPassword({ type:'INPUT_BLUR'});
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);  
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
        // props.onLogin(enteredEmail, enteredPassword);
        console.log('is logged in');
        // console.log(enteredEmail, enteredPassword);
    }

    return (
        <Card className={classes.login}>
        <form onSubmit={(event)=>submitHandler(event)}>
            
                <Input
                     ref={emailInputRef}
                    label='Email'
                     type='email'
                    id='email'
                    isValid={emailIsValid}
                     value={emailState.value}
                     // value={enteredEmail}
                     onChange={emailChangeHandler}
                     onBlur={()=>validateEmailHandler()}
                />

                <Input
                    ref={passwordInputRef}
                    label='Password'
                     type='password'
                    id='password'
                    isValid={passwordIsValid}
                     value={passwordState.value}
                     // value={enteredEmail}
                     onChange={passwordChangeHandler}
                     onBlur={()=>validatePasswordHandler()}
                />


            <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                        // disabled={!formIsValid}
                    >
                        login
                    </Button>
            </div>

        </form>
        </Card>

    )
}
export default Login;