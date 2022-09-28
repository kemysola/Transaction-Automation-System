import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";



export default function StructuringItem2() {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ firstName: ""}]
    }
  });
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "test"
  });

  const onSubmit = (data) => {
    localStorage.setItem('structStructuring',JSON.stringify(data))
  }

  


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`test.${index}.firstName`)}  style={{width:'80%',border:'none'}}/>

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
            append({ firstName: "" });
          }}
        >
          append
        </button>
     

       
        <button
          type="button"
          onClick={() =>
            reset({
              test: [{ firstName: "Bill", lastName: "Luo" }]
            })
          }
        >
          reset
        </button>
      </section>

      <input type="submit" />
    </form>
  );
}

