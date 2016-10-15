import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table
} from 'react-bootstrap';


class App extends Component {



    state = {
        name: "",
        middlename: "",
        lastname: "",
        address: "",
        phonenumber: "",
        typeofpatient: "",
        typecheckup: [],
        gender: "",
        suggestion:"",
        records:[]
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


    saveSurvey = ()=> {

        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button></td>
                     <td>{item.id}</td>
                     <td className="textfieldarea">{item.name} {item.middlename} {item.lastname}</td>
                     <td className="textfieldarea">{item.address}</td>
                    <td>{item.gender}</td>
                     <td className="textfieldarea">{item.phonenumber}</td>
                     <td>{item.typeofpatient}</td>
                     <td>{
                         item.typecheckup.map((typecheckup, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{typecheckup}</span>
                                 </div>
                         })

                      }
                     </td>
                    
                     <td className="textfieldarea">{item.suggestion}</td>
                </tr>
            );
        });


        return (
            <div className="container">
                <div className="page-header">
                <div className="todoAppHeader">Hospital Check up Form</div>
                </div>
                <div className="jumbotron">
                    <Grid>
                        <Row>
                                <Form>
                              <Col md={6}>
                                
                                    <FormGroup>
                                        <h4>First Name</h4>
                                        <FormControl
                                            type="text"
                                            placeholder="First name..."
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                         </FormGroup>
                                  <br/>
                                    <FormGroup>
                                       <h4>Middle Name</h4>
                                        <FormControl
                                            type="text"
                                            placeholder="Middle..."
                                            value={this.state.middlename}
                                            onChange={this.onChange('middlename')}
                                            />
                                    </FormGroup>
                                       <br/>
                                    
                                    <FormGroup>
                                         <h4>Last Name </h4>
                                        <FormControl
                                            type="text"
                                            placeholder="Last Name..."
                                            value={this.state.lastname}
                                            onChange={this.onChange('lastname')}
                                            />
                                    </FormGroup>
                                        <br/>
                                     <FormGroup>
                                        <h4>Address </h4>
                                        <FormControl
                                            type="text"
                                            placeholder="Address..."
                                            value={this.state.address}
                                            onChange={this.onChange('address')}
                                            />
                                    </FormGroup></Col>
                                        <Col md={6}>
                                        <FormGroup>
                                         <h4>Gender  </h4>
                                        <Radio name="gender" value="♂ M"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="♀ F"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup>

                                    
                                     <FormGroup>
                                         <h4>Phone Number </h4>
                                        <FormControl
                                            type="number"
                                            placeholder="Phone number here..."
                                            value={this.state.phonenumber}
                                            onChange={this.onChange('phonenumber')}
                                            />
                                    </FormGroup>
                                    <br/>
                                    <FormGroup>
                                         <h4>Type of Patient </h4>
                                        <FormControl componentClass="select"
                                                     placeholder="Type of Patient you are"
                                                     value={this.state.typeofpatient}
                                                     onChange={this.onChange('typeofpatient')}
                                            >
                                            <option value=""></option>
                                            <option value="New">New</option>
                                            <option value="Existing">Existing</option>
                                            
                                        </FormControl><br/><br/>
                                    </FormGroup>
                                    <FormGroup>
                                         <h4>Type of Check Up </h4>
                                        <Checkbox value="Follow Up"
                                                  checked={this.state.typecheckup.indexOf('Follow Up')>=0 ? true:false}
                                                  onChange={this.checkboxChange('typecheckup')}>
                                            Follow Up
                                        </Checkbox>
                                        <Checkbox value="New Problem"
                                                  checked={this.state.typecheckup.indexOf('New Problem')>=0 ? true:false}
                                                  onChange={this.checkboxChange('typecheckup')}>
                                            New Problem
                                        </Checkbox>
                                    </FormGroup></Col> 

                                   <Col md={6}>
                                    <FormGroup><br/>                                    
                                         <h4>Any Message </h4>
                                        <textarea
                                            type="textarea"
                                            placeholder="Type message..."
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols = "65"
                                            rows = "5"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Submit</Button>

                                    </ButtonGroup> </Col>
                                     </Form>
                        
                            <br/><br/><br/> 
                            <Col md={12}>
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>Patient Name</th>
                                        <th>Address</th>
                                         <th>Gender</th>
                                        <th>Phone Number</th>
                                        <th>Type of Patient</th>                               
                                        <th>Type of Check Up</th>                                      
                                        <th>Other Information</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                           </Col>
                        </Row>
                    </Grid>

                </div>
            </div>
        );
    }
}

export default App;