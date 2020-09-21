import React, { useEffect,useState } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Student from './components/students'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Admin from './components/AdminSignup';
import './App.css';
import { lighten, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const[click,setClick]=useState(false)
  const [username,setUsername]=useState('');
  const [superuser,setSuperUser]=useState(false);
  const [logged_in,setLogged_In]=useState( localStorage.getItem('token') ? true : false);
  const [displayed_form,setDisplayed_form]=useState(null);
  const [errorMessage,setErrorMessage]=useState('')
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
          handle_error()
          }
          else{
         setClick(true)
         setErrorMessage("");
         setSuperUser(json.is_superuser)
         localStorage.setItem('name',json.username)
         setUsername(json.username)
        }})
 
    }
  },[])
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
      }).catch(err =>{
        setErrorMessage("Your Username or password is wrong!!!!!!!")
        handle_error() 
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
      });
  };
  const handle_logout = () => {
    setClick(false)
    localStorage.removeItem('token');
    setLogged_In(false)
    setUsername('')
    setDisplayed_form(null)
  };
   const handleclick =e=>{
    const n=e.target.id;
     switch (n) {
       case '2':
          setDisplayed_form(<LoginForm handle_login={handle_login} />);
         break;
       case '1':
          setDisplayed_form(<SignupForm handle_signup={handle_signup} />);
         break;
       case '4':
          setDisplayed_form(<Admin handle_signup={handle_signup} />);
         break;
       default:
         setDisplayed_form(null);
      }
      setErrorMessage("")
      setClick(true)
   }
    return (
      <Container  style={{backgroundColor:"whitesmoke"}}>
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {superuser?`${username} - Admin`:`${username}`}
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                 {logged_in?<MenuItem  onClick={handle_logout}>Logout</MenuItem>:
                <MenuItem  id='4'value='admin' onClick={handleclick}>Admin</MenuItem>}
                {logged_in?'':<MenuItem  id='1'value='signup' onClick={handleclick}>SignUp</MenuItem>}
                {logged_in?'':<MenuItem  id='2' value='login' onClick={handleclick}>Login</MenuItem>}
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <div>
      {!click ?<Jumbotron>
        <h1 className="display-3">Hello, Please Log in</h1>
        <p className="lead">This is system used to keep students records</p>
        <hr className="my-2" />
        <p>This is simple app developed as Django-React demo project </p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>:''}
    </div>
      <h3 className="error"> { errorMessage } </h3> 
        <div>
        {displayed_form}
        </div>
          <div>{logged_in?<Student logged_in={logged_in} superuser={superuser}/>:''}</div>
    </div>
    </Container>     
    );
  
}
export default App;



