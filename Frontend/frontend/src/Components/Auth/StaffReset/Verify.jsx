import React,{useState, useEffect} from 'react';
import axios from "../../../Sevices/api/http-common";

export default function Reset() {
    const [message, setMessage] = useState()
    const [email, setEmail] = useState()
    

    useEffect(() => {
        axios.get('staff/confirm/:confirmationCode').then((res) => {
            const email = res.data.userEmail
            const message = res.data.message
            setMessage(message)
            setEmail(email)
        })
    },[])
   
  return (
    <div>
        <h1 style={{color:'black'}}>Hello 
        <bold style={{color:'red'}}> {email}, </bold>
        <br/>
        {message}.
        <br/>
        <br/>
        You are required to change your password to Login to the Application.
        </h1>
        <button>Reset Password</button>
        
    </div>
  )
}
