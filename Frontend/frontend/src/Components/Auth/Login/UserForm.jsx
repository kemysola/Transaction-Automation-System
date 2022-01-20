import React from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, InputGroup, FormControl,ButtonGroup} from 'react-bootstrap';



const useStyles = makeStyles({
    formBg:{
        'background': 'white',
        'borderRadius': '13px',
        'padding': '20px',
    },
    center :{
        'textAlign':''
    },
    green:{
        'background': 'green',
        'color':'white',
        'width': '20vw',
        'border' : '1px transaparent green',
        'borderRadius' :'6px',
    },
    
})

const UserForm =()=>{
    const forms = useStyles()
      return (
        <React.Fragment>
            <div className={forms.formBg}>
                <Form action='' post=''>
                    <h3>Sign In</h3>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                         <Form.Control size="sm" type="password" placeholder="password" />
                    </Form.Group>
                  
                       <Form.Group>
                           <input type='checkbox'/>
                           <small> Remember me</small>
                       </Form.Group>
                   
                    
                    <br/>
                    <Form.Group className="mb-3 text-light" controlId="exampleForm.ControlInput1">
                         <Form.Control size="sm" type="Button" placeholder="Login" className='bg-success' />
                    </Form.Group>
                
                </Form>
                
            </div> 
        </React.Fragment>
      );
}

export default UserForm;