import { useForm } from "react-hook-form";

export const Form = ({onSubmit, onFocusChange}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFocusChange = (isFormInFocus) => {
    onFocusChange(isFormInFocus);
  }
   
  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)}>
        {
            (errors?.rowPosition?.type === "required" || errors?.columnPosition?.type === "required")  
            && <p>Please enter both row and column position. Both fields are required.</p>
        }
        {
            (["min","max"].includes(errors?.rowPosition?.type) || ["min","max"].includes(errors?.columnPosition?.type))  
            && <p>Please enter a numerical value between 1 and 5 for both row and column position.</p>
        }
        <label htmlFor="rowPosition">Row Number:</label>
        <input type="number" id="rowPosition" name="rowPosition" {...register("rowPosition", { min: 1, max: 5, required: true })} />
        <label htmlFor="columnPosition">Column Number:</label>
        <input type="number" id="columnPosition" name="columnPosition" {...register("columnPosition", { min: 1, max: 5, required: true })} />
        <input type="submit"/>
    </form>
  );
}