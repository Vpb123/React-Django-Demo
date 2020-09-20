import React, { useEffect,useState } from 'react';
// import Nav from './components/Nav';
import Student from './components/students'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Admin from './components/AdminSignup';
import './App.css';
// import axios from 'axios';
function App() {

  // const [displayed_form,setDisplayed_form]=useState('');
  const [username,setUsername]=useState('');
  const [superuser,setSuperUser]=useState(false);
  const [logged_in,setLogged_In]=useState( localStorage.getItem('token') ? true : false);
  const [displayed_form,setDisplayed_form]=useState(null);
  const [errorMessage,setErrorMessage]=useState('')

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     displayed_form: '',
  //     logged_in: localStorage.getItem('token') ? true : false,
  //     username: '',
  //     errorMessage:''
  //   };
  useEffect(()=> {
    if (logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if(json.username === undefined){
            // localStorage.removeItem('token');
            handle_error()
            // setUsername('');
          }
          else{
         setErrorMessage("");
         setSuperUser(json.is_superuser)
         localStorage.setItem('name',json.username)
        }})
 
    }
  },[])
  // const refreshPage=()=> {
  //   window.location.reload(false);
  // }
 const  handle_error=() => {
    localStorage.removeItem('token');
    setUsername('');
    setLogged_In(false)
  }
 
 const  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setErrorMessage("")
        setLogged_In(true)
        setDisplayed_form(null)
        setUsername(json.user.username)
        setSuperUser(json.user.is_superuser)
        console.log(json)
        localStorage.removeItem('name')
        localStorage.setItem('name',json.user.username)
        // this.setState({
        //   logged_in: true,
        //   displayed_form: '',
        //   username: json.user.username
        // });
      }).catch(err =>{
        setErrorMessage(err.message)
        handle_error()
        // this.setState({errorMessage: err.message});   
      })
  };

  const handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLogged_In(true)
        setDisplayed_form(null)
        setUsername(json.username)
        setSuperUser(json.is_superuser)
        localStorage.setItem('name',json.first_name)
        // this.setState({
        //   logged_in: true,
        //   displayed_form: '',
        //   username: json.username
        // });
      });
  };

  const handle_logout = () => {

    localStorage.removeItem('token');
    setLogged_In(false)
    setUsername('')
    setDisplayed_form(null)
    // this.setState({ logged_in: false, username: '' });
  };


 
 
  // const display_form = form => {
  //   setDisplayed_form(form)
  //   // this.setState({
  //   //   displayed_form: form
  //   // });
  // };
  // let form;
   const handleclick =e=>{
    const n=e.target.value;
     switch (n) {
       case 'login':
          setDisplayed_form(<LoginForm handle_login={handle_login} />);
         break;
       case 'signup':
          setDisplayed_form(<SignupForm handle_signup={handle_signup} />);
         break;
       case 'admin':
          setDisplayed_form(<Admin handle_signup={handle_signup} />);
         break;
       default:
         setDisplayed_form(null);
      }
      setErrorMessage("")
   }
  // let nav;
  // switch(logged_in){
  //   case true:
  //     nav=`<button id='3' value='logout' onClick={handle_logout}>logout</button>`
  //   case false:
  //     nav= `<button id='1'value='signup' onClick={handleclick}>signup</button>`
  //         // <button id='2' value='login' onClick={handleclick}>login</button>)
  //   default:
  //     nav=null;
  // }
    // logged_in:
    //   <ul>
    //     <li onClick={() => display_form('login')}>login</li>
    //     <li onClick={() => display_form('signup')}>signup</li>
    //   </ul>
    
   
    // const logged_in_nav = (
    //   <ul>
    //       <li onClick={handle_logout}>logout</li>
    //   </ul>
    // );
  
    return (
      
      <div className="App">
        <h3 className="error"> { errorMessage } </h3> 
        <div>
        <ul>
            <button id='1'value='admin' onClick={handleclick}>Admin</button>
            <button id='1'value='signup' onClick={handleclick}>signup</button>
            <button id='2' value='login' onClick={handleclick}>login</button>
            <button id='3' value='logout' onClick={handle_logout}>logout</button>
         </ul>
        </div>
        {displayed_form}
        <h3>
          {logged_in
            ? `Hello, ${localStorage.getItem('name')} ,${superuser}`
            : 'Please Log In'}
        </h3>
          <div>{logged_in?<Student logged_in={logged_in} superuser={superuser}/>:''}</div>
      </div>
      
    );
  
}
export default App;
// import React from 'react';


// import './App.css';

// import Student from './components/students';

// function App(){
//   return (
//     <div className="App" >
      
//       <Student />
//     </div>
//   );


  
    
// }



