import React,{useEffect} from 'react';

export default function Home(){

   useEffect(() => {
   window.location.assign('http://localhost:5000/api/v1/auth')
 
  }, []);
  
    return(
        <React.Fragment>
            
        </React.Fragment>

    )
}