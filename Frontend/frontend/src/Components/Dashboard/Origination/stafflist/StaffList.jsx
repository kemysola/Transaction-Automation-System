import React,{useEffect, useMemo, useState,} from 'react'

import Service from '../../../../Services/Service'

function StaffList() {
    const [data, setData] = useState();
    useEffect(() =>{
        retrieveStaff()

    }, [])

    const retrieveStaff = () => {
        Service.getAllStaff()
          .then((response) => {
              console.log(response)
            setData(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    

  return (
    <div>StaffList</div>
  )
}

export default StaffList