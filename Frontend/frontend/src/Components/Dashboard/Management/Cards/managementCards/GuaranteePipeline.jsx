import React, { useEffect , useState} from 'react';
import Service from '../../../../../Services/Service'
function GuaranteePipeline() {
    const [guarPipeline, setGuarPipeline] = useState([])
    const [actual, setActual] = useState([])
    const [ variance, setVariance] = useState([])
    const [target, setTarget] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
      Service.getAllStaff().then((res) => {
        console.log(res.data.staff)
        setData(res.data.staff)

      }).catch((err) => {
        console.log(err);
      });

    }, [])

    useEffect(() => {
      Service.getAllDeals().then((res) => {
        console.log(res.data.deals);
        setActual(res.data.deals)
      }).catch((err) => {
        console.log(err)
      })

    }, [])

  
    var targetValue = data.reduce(function (tot, arr) {
      return tot + parseFloat(arr.guaranteepipeline);
    }, 0);
    
  
  
  
  
  return (
    <div>GuaranteePipeline
<div style={{background:'black', color:'white'}}>
{targetValue}
<br/>

</div>
    </div>
  )
}

export default GuaranteePipeline