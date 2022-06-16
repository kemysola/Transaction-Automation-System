import { useState, useEffect } from 'react';


const Form = () => {
  const [color, setColor] = useState({});
  const [formError, setFormError] = useState(false);
  const [fieldOption, setFieldOption] = useState(false);
  const [input, setInput] = useState('');

  const formOps = () => {
    setColor({ deal_category: 'blue' });

    if (color.deal_category === 'green') {
      setFieldOption(true);
    }
  }   

  useEffect(() => {
    formOps();
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();

    if(color.deal_category === 'green' && !input) return setFormError(true);

  }


  return <div style={{marginTop: '40px'}}>
    {
      formError && <p style={{color: 'red'}}>This field is required!</p>
    }
    <form>
      
      <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Please type something...' required={fieldOption && true} name="" id="" />

      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </form>
  </div>;
};

export default Form