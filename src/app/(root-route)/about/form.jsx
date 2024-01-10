import { useFormState } from "react-dom";

import SubmitButton from "@/componants/route/button/submitButton";
import { uploadFile } from "./action";

const initialState = { message: null };

export function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
    <div className="form-wrapper">
      <form action={formAction}>
        <input type="file" id="file" name="file" accept="images/*" />
        <SubmitButton name="submit" type="loading" />
      </form>
      {state?.status && (
        <div className={`state-message ${state?.status}`}>{state?.message}</div>
      )}
    </div>
  );
}
