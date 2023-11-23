import { useForm } from "react-hook-form";
import formStyles from "./Form.module.scss";

export const Form = ({onSubmit, onFocusChange}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFocusChange = (isFormInFocus) => {
    onFocusChange(isFormInFocus);
  }
   
  return (
    <form className={formStyles.inputForm} onSubmit={handleSubmit(onSubmit)} onFocus={() => handleFocusChange(true)} onBlur={() => {handleFocusChange(false);}}>
        {
            (errors?.rowPosition?.type === "required" || errors?.columnPosition?.type === "required")  
            && <p className={formStyles.validationMessage}>Please enter both row and column position. Both fields are required.</p>
        }
        {
            (["min","max"].includes(errors?.rowPosition?.type) || ["min","max"].includes(errors?.columnPosition?.type))  
            && <p className={formStyles.validationMessage}>Please enter a numerical value between 1 and 5 for both row and column position.</p>
        }
        <div className={formStyles.formGroup}>
            <label className={formStyles.formLabel} htmlFor="rowPosition">X Location:</label>
            <input type="number" id="rowPosition" data-testid="x-position" name="rowPosition" {...register("rowPosition", { min: 1, max: 5, required: true })} />
        </div>
        <div className={formStyles.formGroup}>
            <label className={formStyles.formLabel} htmlFor="columnPosition">Y Location:</label>
            <input type="number" id="columnPosition" data-testid="y-position" name="columnPosition" {...register("columnPosition", { min: 1, max: 5, required: true })} />
        </div>
        <input type="submit" data-testid="form-submit-button"/>
    </form>
  );
}