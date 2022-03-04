import React, {useState, useRef} from 'react';
import axios from '../../../http-common';
import AuthService from '../../../Services/auth.Service';
import {useParams} from 'react-router-dom'


const user = JSON.parse(localStorage.getItem('user'))
export default function PasswordReset(){
    const [error, setError] = useState()
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [data, setData] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    });

    /*const handleChange = (e) =>{
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name] : value
        });

    }*/
    const {id} = useParams()

    const onChangePassword = (e) => {
        const OldPassword = e.target.value;
        setOldPassword(OldPassword);
        console.log(oldPassword)
      };

      const onChangeNewPassword = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
        console.log(newPassword)
      };

    /*const validate = () =>{
        if(newPassword !== confirmPassword){
            return false;
        }
    }*/
    const handleSubmit = async(e) =>{
        e.preventDefault();
       /* if(data.oldPassword ==''){
            return false;

        }
        if(data.newPassword ==''){
            return false;

        }*/

        //let email = "dakemilola@gmail.com"
        //console.log(email)

        /*const reqData = {
            password: data.oldPassword,
            newPassword:data.newPassword,
            confirmPassword: data.confirmPassword
        };
        console.log(data.oldPassword)*/
        
        await AuthService.updatePassword(user,oldPassword,newPassword).then((res) =>{
            console.log(res)
            
            

        })

    }
    return(
        <React.Fragment>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label for='password'>Password</label>
                        <input
                        type="password"
                        value={oldPassword}
                        name='oldPassword'
                        onChange={onChangePassword}
                        />
                        <label for='old password'>New Password</label>
                        <input
                        type="password"
                        value={newPassword}
                        name='newPassword'
                        onChange={onChangeNewPassword}
                        />
                    </div>
                    <button>Reset</button>
                    <p>{user}</p>
                </form>
            </div>
        </React.Fragment>
    )
}