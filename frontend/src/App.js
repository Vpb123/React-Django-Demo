import React,{ Component } from 'react';
import axios from "axios";
class App extends Component {
  constructor(props){
    super(props);
    this.state={
    studentList:[],
    Marks:[],
    mark:[],
    show:false
  };
  this.handleClick = this.handleClick.bind(this);
}
handleClick() {
  this.setState(state => ({
    show:true
  }));
}
onMarkSelect(m){
  this.setState({mark:m});
  this.setState(state => ({
    show:true
  }));
}
componentDidMount() {
  this.refreshList();
  // this.refreshList2();
}
refreshList = () => {
  axios
    .get("http://localhost:8000/api/studentd/")
    .then(res => this.setState({ studentList: res.data }))
    .catch(err => console.log(err));
};
// refreshList2 = () => {
//   axios
//     .get("http://localhost:8000/api/marks/")
//     .then(res => this.setState({ Marks: res.data }))
//     .catch(err => console.log(err));
// };

// renderMarks =() =>{
//   const marks=this.state.Marks
//   return marks.map(mark =>(
//     <tr  key={mark.id} >
//     <td>{mark.physics}</td>
//     <td>{mark.chemistry}</td>
//     <td>{mark.maths}</td>
//   </tr>
//   ));
// };
renderItems = () => {
  const stud=this.state.studentList
  // if(this.state.show === false){
    
  return stud.map((item,index) => (
    <tr  key={item.id} >
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{item.Class}</td>
      <td>{item.Roll_no}</td>
      <td>{item.City}</td>
     
      <td>{item.marks.physics}</td>
      <td>{item.marks.chemistry}</td>
      <td>{item.marks.maths}</td>

    </tr>
   ));
};
render(){
  return (
    <div className='container'>
      <div class="header">
    <h1>STUDENT INFORMATION</h1>
       <p>Welcome to student portal!</p>
    </div>
    <section className='dis'>
    <table className="table table-hover ">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Serial.No</th>
      <th scope="col">Name</th>
      <th scope="col">Class</th>
      <th scope="col">Roll No</th>
      <th scope="col">City</th>

      <th scope="col">Physics</th>
      <th scope="col">Chemistry</th>
      <th scope="col">Maths</th>
    </tr>
  </thead>
  <tbody className='tab'> {this.renderItems()}</tbody>
  
  {/* //  <tbody className='tab'>{this.renderMarks()}</tbody>} */}
    </table>
    </section>
    </div>
  );
}
}

export default App;
