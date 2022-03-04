import React, { useState, useEffect } from 'react'
import axios from '../../http-common'


export default function Verify() {
    const [message, setMesage] = useState()
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/staff/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImxiYWJhbG9sYUBkZWxvaXR0ZS5jb20ubmciLCJpYXQiOjE2NDYyMjc3NzgsImV4cCI6MTY0NjMxNDE3OH0.2I1EPAnYV-GH6hHhDfKqAErfQMOWPN9zrLQ6lLDo58c')
            .then((req) => {
                console.log(req.data)
                const data = req.data
                setMesage(data)
                
        })


    },[])
    return (
        <div>
            <p> `heleo{message}`</p>
        </div>
    );
}
