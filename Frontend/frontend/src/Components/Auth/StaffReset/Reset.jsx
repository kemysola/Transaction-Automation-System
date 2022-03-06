import React, {useState, useRef} from 'react';
import axios from '../../../http-common';
import AuthService from '../../../Services/auth.Service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";




const user = JSON.parse(localStorage.getItem('user'));
const email =user.name;
const PWD_REGEX =/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block" >This field is required!</div>
      );
    
    }
    console.log('no')
  };
export default function Reset(){
    const form = useRef();
    const [error, setError] = useState()
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [data, setData] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    });

    
   
    const onChangePassword = (e) => {
        const oldPassword = e.target.value;
        setOldPassword(oldPassword);
        console.log(oldPassword)
      };

      const onChangeNewPassword = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
        console.log(newPassword)
      };
      const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        console.log(confirmPassword)
      };

    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        form.current.validateAll();
       
       
        
        //await AuthService.updatePassword(email,oldPassword,newPassword).then((res) =>{
            //console.log(res)
            
            

        //})

    }
    return(
        <React.Fragment>
            <h1>Hi {email}</h1> 
            <p>Kindly change your password</p>
            <Form onSubmit={handleSubmit} ref={form}>
            <label htmlFor='Password'>
              Password:
            </label>
            <Input 
            type="password"
            value={oldPassword}
            name='oldPassword'
            onChange={onChangePassword} 
            validations={[required]}
            
            />

            <br/>

            <label htmlFor='newPassword'>
              New Password:
            </label>

            <Input 
            type="password"
            value={newPassword}
            name='newPassword'
            onChange={onChangeNewPassword} 
            validations={[required]}
            
            />

            <label htmlFor='confirmPassword'>
              Confirm Password:
            </label>

            <Input 
            type="password"
            value={confirmPassword}
            name='confirmPassword'
            onChange={onChangePassword} 
            validations={[required]}
            
            />
            <button>Submit</button>
            </Form>
            
            
        </React.Fragment>
    )
}