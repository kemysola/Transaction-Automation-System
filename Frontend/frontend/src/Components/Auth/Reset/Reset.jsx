import React, {useState, useRef} from 'react';
import axios from '../../../http-common';
import ResetService from '../../../Services/reset.Services';
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

    
    const {id} = useParams()

    const onChangePassword = (e) => {
        const OldPassword = e.target.value;
        setOldPassword(OldPassword);
      };

      const onChangeNewPassword = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
      };

    
    const handleSubmit = async(e) =>{
        e.preventDefault();
      
        await ResetService.resetPassword(user,oldPassword,newPassword).then((res) =>{
    
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