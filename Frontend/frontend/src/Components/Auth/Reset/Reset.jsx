import React, {useState, useRef} from 'react';
import axios from 'axios';

const Url ='';

export default function PasswordReset(){
    const [data, setData] = useState({
        oldPassword:"",
        newPassword:""
    });

    const handleChange = (e) =>{
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name] : value
        });

    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const Data = {
            oldPassword: data.oldPassword,
            newPassword:data.newPassword
        };

        await axios.put(Url, Data)
        .then(response  => {
            console.log('Changed Password Successfully')
        })
        .catch(error => {
            console.log(response.error)
        })


    }
    return(
        <React.Fragment>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label for='old password'>Old Password</label>
                        <input
                        type="password"
                        value={data.oldPassword}
                        name='oldPassword'
                        onChange={handleChange}
                        />
                        <label for='old password'>Old Password</label>
                        <input
                        type="password"
                        value={data.newPassword}
                        name='newPassword'
                        onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}