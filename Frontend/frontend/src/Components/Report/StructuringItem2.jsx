import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function StructuringItem2() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      structuring: [{ structuring: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "structuring",
  });

  const onSubmit = (data) => {
    setIsDisabled(true);
    localStorage.setItem("structStructuring", JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`structuring.${index}.structuring`)}
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
            append({ structuring: "" });
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            reset({
              structuring: [{ structuring: "" }],
            });
            setIsDisabled(false);
          }}
        >
          reset
        </button>
      </section>
      <button type="submit" disabled={isDisabled}>
        Save
      </button>
    </form>
  );
}
