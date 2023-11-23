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
            && <p className={formStyles.validationMessage} data-testid="required-validation-message">Please enter both row and column position. Both fields are required.</p>
        }
        {
            (["min","max"].includes(errors?.rowPosition?.type) || ["min","max"].includes(errors?.columnPosition?.type))  
            && <p className={formStyles.validationMessage} data-testid="value-validation-message">Please enter a numerical value between 1 and 5 for both row and column position.</p>
        }
        <div className={formStyles.formGroupContainer}>
            <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel} htmlFor="rowPosition" id="rowPositionLabel">X Location:</label>
                <input className={formStyles.numInput} type="number" aria-labelledby="rowPositionLabel" id="rowPosition" data-testid="x-position" name="rowPosition" {...register("rowPosition", { min: 1, max: 5, required: true })} />
            </div>
            <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel} htmlFor="columnPosition" id="columnPositionLabel">Y Location:</label>
                <input className={formStyles.numInput} type="number" aria-labelledby="columnPositionLabel" id="columnPosition" data-testid="y-position" name="columnPosition" {...register("columnPosition", { min: 1, max: 5, required: true })} />
            </div>
        </div>
        <button className={formStyles.submitButton} type="submit" data-testid="form-submit-button">Reset robot position</button>
    </form>
  );
}