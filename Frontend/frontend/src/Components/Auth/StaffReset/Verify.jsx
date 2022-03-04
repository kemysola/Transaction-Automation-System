import React,{useState, useEffect} from 'react';
import axios from '../../../http-common'
import { useLocation } from 'react-router';



export default function Reset() {
    const [message, setMessage] = useState()
    const [email, setEmail] = useState()
    /*try{
        axios.get('staff/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImRha2VtaWxvbGFAZ21haWwuY29tIiwiaWF0IjoxNjQ2MzE4NDI2LCJleHAiOjE2NDY0MDQ4MjZ9.k9v9Z_E7sNvcB_qa92zsGySfoN6vPnR2qfgM0mU0BVI').then((res) => {
            console.log(res.data.userEmail)
            console.log(res.data.message)
        })
        

    }catch(err){
        console.log(err)
    }*/

    useEffect(() => {
        axios.get('staff/confirm/:confirmationCode').then((res) => {
            console.log(res.data.userEmail)
            console.log(res.data.message)
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
