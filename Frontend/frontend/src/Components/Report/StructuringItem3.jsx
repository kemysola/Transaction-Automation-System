import React,{useState} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";



export default function StructuringItem3() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      execution: [{ execution: ""}]
    }
  });
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "execution"
  });

  const onSubmit = (data) => {
    setIsDisabled(true);
    localStorage.setItem('structExecution',JSON.stringify(data))
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`execution.${index}.execution`)}  style={{width:'80%',border:'none'}}/>

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ execution: "" });
          }}
        >
          append
        </button>
     

       
        <button
          type="button"
          onClick={() =>
            reset({
              execution: [{ execution: "" }]
            })
          }
        >
          reset
        </button>
      </section>

      <button type="submit" disabled={isDisabled}>save</button>
    </form>
  );
}

