import React, { useEffect } from 'react';

export default function Home() {

    useEffect(() => {
    window.location.assign('https://trms01-server.azurewebsites.net/api/v1/auth')
        //window.location.assign('http://localhost:5001/api/v1/auth')

    }, []);

    

    return (
        <React.Fragment>

        </React.Fragment>

    )
}