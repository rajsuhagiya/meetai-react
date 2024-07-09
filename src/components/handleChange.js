import { FolderSchema } from "../schemas";
import { useFormik } from "formik";

export const {
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
} = useFormik({
  initialValues: editFolderData,
  validationSchema: FolderSchema,
  onSubmit: async (values, action) => {
    alert("hi");

    // action.resetForm();
  },
});
