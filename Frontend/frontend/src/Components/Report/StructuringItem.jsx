import React, { useEffect,useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function StructuringItem() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      duediligence: [{ duediligence: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "duediligence",
  });
  useEffect(() => {
  }, []);
  const onSubmit = (data) => {
    setIsDisabled(true)
    localStorage.setItem("structInput", JSON.stringify(data));

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`duediligence.${index}.duediligence`)}
                style={{ width: "80%", border: "none" }}
              />

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
            append({ duediligence: "" });
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() =>{reset({
            duediligence: [{ duediligence: "", lastName: "" }],

          })
          setIsDisabled(false)
        }
            
          }
        >
          reset
        </button>
      </section>

      {/* <input type="submit" /> */}
      <button type="submit"  disabled={isDisabled}>Save</button>
    </form>
  );
}
