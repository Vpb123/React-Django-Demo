import React,{useState} from 'react';
import PropTypes from 'prop-types';

function LoginForm(props) {
  // state = {
  //   username: '',
  //   password: ''
  // };
  const [state,setState]=useState({username:'',password:''})
  // const[username,setUsername]=useState('')
  // const[password,setPasssowrd]=useState('')

const  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  
  return (
      <form onSubmit={e => props.handle_login(e, state)}>
        <h4>Log In</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handle_change}
        />
        <input type="submit" />
      </form>
    );
  }

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
  };
// 
export default LoginForm;


