import React, {useState, useEffect} from 'react'

const Sample = () => {
   const [enabled, setEnabled] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [message, setMessage] = useState('');


   useEffect(() => { 
      if(email.length) {
         setEnabled(true);
         setMessage("email is required");
      } else {
         setEnabled(false);
      }
   }, [email]);





  return (
     <>
        <form>
           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
           <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type="submit" disabled={enabled}>Submit</button>
     </form>
     </>
  )
}

export default Sample