import React, {useState} from 'react';
import PropTypes from 'prop-types';

function Admin(props){
//  {
//   state = {
//     username: '',
//     password: ''
//   };
  const[state,setState]=useState({username:'',password:'',first_name:'',last_name:'',email:'',is_superuser:true})
  const handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

    return (
      <form onSubmit={e => props.handle_signup(e,state)}>
        <h4>Sign Up as Admin</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handle_change}
        />
         <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={state.first_name}
          onChange={handle_change}
        />
         <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={state.last_name}
          onChange={handle_change}
        />
         <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handle_change}
        />
        <input type="submit" onClick={()=>console.log(state.is_superuser)}  />
      </form>
    );
  }


Admin.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
export default Admin;
