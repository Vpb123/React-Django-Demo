import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
export default function Student(props) {
    const classes = useStyles();
    const [err,setError]=useState(" ");
    const [state, setState] = useState({
    columns: [
      {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.name} />  },
      { title: 'Name', field: 'name' },
      { title: 'Roll_no', field: 'Roll_no' },
      { title: 'Class', field: 'Class' },
      { title: 'City', field: 'City'},
      { title: 'Physics', field: 'marks.physics' },
      { title: 'Chemistry', field: 'marks.chemistry' },
      { title: 'Maths', field: 'marks.maths'},
    ],
    data: [ ],
  });
  

  useEffect(() => {
    const url = `http://localhost:8000/api/studentd/`
    axios.get(url ,{
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
          .then(res => {
            console.log(res);
            setState((prevState) => {
           
              const data = res.data
              return { ...prevState, data };
            });
          })
          .catch(e => {
            console.log(e);
          })
  }, [])

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const refreshPage=()=> {
    window.location.reload(false);
  }
  const edit = (oldData,newData) =>{
    if(props.superuser===false){
      setError("You are not Authorized!!!Reloading Page!")
      refreshPage()
    }else{
    var csrf = getCookie('csrftoken')
    var url = `http://localhost:8000/api/studentd/${oldData.id}/`;
    fetch(url,{
      method: 'PUT',
      headers:{
           Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-type':'application/json',
          'X-CSRFToken':csrf,
      },
      body: JSON.stringify(newData)
    })
    .then(e => {
      setState((prevState) => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = newData;
        return { ...prevState, data };
      });

    })
  }}

  const create = (newData) =>{
    if(props.logged_in === false){
      setError("You are not Authorized!!!Reloading Page!")
      refreshPage()
    }else{
    var csrf = getCookie('csrftoken')
    var url = `http://localhost:8000/api/studentd/`;
    fetch(url,{
      method: 'POST',
      headers:{
          Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-type':'application/json',
          'X-CSRFToken':csrf,
      },
      body: JSON.stringify(newData)
    })
    .then(e => {
      setState((prevState) => {
        const data = [...prevState.data];
        data.push(newData);
        return { ...prevState, data };
      });
    })
  }
  }
  const deleteS = (oldData) => {
    if(props.superuser===false){
      setError("You are not Authorized!!!Reloading Page!")
      refreshPage()
    }else{
    var csrf = getCookie('csrftoken')
    var url = `http://localhost:8000/api/studentd/${oldData.id}`;
    fetch(url,{
      method: 'DELETE',
      headers:{
         Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-type':'application/json',
          'X-CSRFToken':csrf,
      }
    })
    .then(e => {
      setState((prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });
      
    })

  }}

  return (
  <div>
  <h5 style={{color:"red"}}>{err}</h5>
    <MaterialTable  className={classes.root}
    icons={tableIcons}
      options={{
        exportButton: true,
        // filtering: true,
        sorting: true,
        search: true,
        grouping: true,
        // rowStyle: {
        //   backgroundColor: '#f345',
        // },
        // headerStyle: {
        //   backgroundColor: '#23eb8a',
        //   color: '#0a0a0a'
        // }
       
          body: {
            fontSize: 14,
          },
      }}
      title="Student Portal"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              create(newData);
              
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                console.log(newData.marks.physics)
                edit(oldData,newData);
              }
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteS(oldData)
              
            }, 1000);
          }),
      }}
    />
    </div>
  );
}


// import React from 'react';
// import { Component } from "react";

// import './App.css';
// import {
//   Table
// } from "reactstrap";
// import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

// import Student from './components/student'

// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       marks: [],
//       active:{
//         id:null,  
//         name:'',
//         regno:'',
//         address:'',
//         mobile:'',
//         scores:{},
//         completed:false
//       },
      
//       editing:false,
//     };
//     this.fetchStudents = this.fetchStudents.bind(this)
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.getCookie = this.getCookie.bind(this);
    

//   }
//   componentWillMount(){
//     this.fetchStudents()
//   }

//   fetchStudents(){
//     console.log('fetching');
//     fetch('http://localhost:8000/student/')
//     .then(res => res.json())
//     .then(x => {
//         console.log((x));
        
        

//         this.setState({ marks: x })
      
//       }
      
//       )
//   }

//   handleChange(event) {
      
//     var v = event.target.value
    
//     console.log(` name:${v} `);
//     this.setState({
//         active:{
//             ...this.state.active,
//             [event.target.name]:v
           


//         }
//     });

//   }

//   startedit(obj){
//     this.setState({
//       editing:true,
//       active:obj,

//     })

//   }

//   getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

//   handleSubmit(event) {

//     console.log(this.state.active);
//     event.preventDefault();
//     var csrf = this.getCookie('csrftoken')

//     var url = 'http://localhost:8000/student/';
//     var method = 'POST'

//     if(this.state.editing === true){
//       method = 'PUT'
//       url = `http://localhost:8000/student/${this.state.active.id}/`;
//       this.setState({
//         editing:false
//       })
//     }




//     fetch(url,{
//         method:method,
//         headers:{
//             'Content-type':'application/json',
//             'X-CSRFToken':csrf,
//         },
//         body: JSON.stringify(this.state.active)
//     }).then(res => {
//         this.fetchStudents();
//         this.setState({
//             active:{
        
//                 name:'',
//                 regno:'',
//                 address:'',
//                 mobile:'',
//                 scores:[],
//                 completed:false
//               }

//         })
//     }).catch(e => {
//         console.log(e);
//     })

  
//   }


//   render(){
//     var data = this.state.marks;
//     var self = this
    

   
//     return(
//       <div className='container'>
//         <Student />
//         <h1 className="text-center">Student Information</h1>
        
//         <Form onSubmit={this.handleSubmit}>
//         <Row form>
//           <Col md={6}>
//             <FormGroup>
//               <Label for="exampleEmail">Name</Label>
//               <Input onChange={this.handleChange} value={this.state.active.name} type="text" name="name"  placeholder="Name" />
//             </FormGroup>
//           </Col>
//           <Col md={6}>
//             <FormGroup>
//               <Label for="examplePassword">Reg. No.</Label>
//               <Input onChange={this.handleChange} value={this.state.active.regno} type="text" name="regno"  placeholder="Registration Number" />
//             </FormGroup>
//           </Col>
//         </Row>
//         <FormGroup>
//           <Label for="exampleAddress">Address</Label>
//           <Input onChange={this.handleChange} value={this.state.active.address} type="text" name="address"  placeholder="Address"/>
//         </FormGroup>
//         <Row form>
//           <Col md={6}>
//             <FormGroup>
//               <Label for="exampleCity">Mobile No.</Label>
//               <Input onChange={this.handleChange} value={this.state.active.mobile} type="text" name="mobile" />
//             </FormGroup>
//           </Col>
//           {/* <Col md={2}>
//             <FormGroup>
//               <Label for="exampleCity">Physics Marks</Label>
//               <Input type="text" onChange={this.handleChange} value={this.state.active.scores.physics} name="physics" id="exampleCity"/>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <Label for="exampleState">Maths Marks</Label>
//               <Input type="text" onChange={this.handleChange} value={this.state.active.scores.chemistry} name="maths" id="exampleState"/>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <Label for="exampleZip">Chemistry Marks</Label>
//               <Input type="text" onChange={this.handleChange} value={this.state.active.scores.maths} name="chemistry" id="exampleZip"/>
//             </FormGroup>  
//           </Col> */}
//         </Row>
        
        
        
//         <Button type='submit'>Submit</Button>
        
//       </Form>

        
        
//         <div className='mt-2'>
          
//         <Table  bordered hover dark>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Reg. No.</th>
//             <th>Address</th>
//             <th>Mobile No.</th>
            
//             <th>Phy Marks</th>
//             <th>Chem Marks</th>
//             <th>Maths Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((s,i) => {
//             return(
//               <tr key={i}>
//                 <td onClick={() => self.startedit(s)} >{s.id} </td>
//                 {/* <td>{s.student.name} </td>
//                 <td>{s.student.regno}</td>
//                 <td>{s.student.address}</td>
//                 <td>{s.student.mobile}</td>
//                 <td>{s.physics} </td>
//                 <td>{s.chemistry} </td>
//                 <td>{s.maths} </td> */}
//                 <td>{s.name} </td>
//                 <td>{s.regno} </td>
//                 <td>{s.address} </td>
//                 <td>{s.mobile} </td> 
             
//                 <td>{s.marks.physics} </td>
//                 <td>{s.marks.chemistry} </td>
//                 <td>{s.marks.maths} </td>
                
                
                                  
//               </tr>  
//             )          
//           })}
    
    
//         </tbody>
//         </Table>
          
          
//         </div>


//       </div>
      
//     );
//   }
// }

// export default App;


