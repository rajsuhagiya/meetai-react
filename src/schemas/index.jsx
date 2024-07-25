import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Please Enter Current Password"),
  npassword: Yup.string()
    .min(5, "New password must be at least 5 characters")
    .required("Please Enter New Password"),
  cpassword: Yup.string()
    .min(5, "Confirm password must be at least 5 characters")
    .required("Please Enter Confirm Password")
    .oneOf(
      [Yup.ref("npassword"), null],
      "New Password and Confirm Password not match"
    ),
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Please Enter Password"),
});

export const BotSchema = Yup.object({
  ebotName: Yup.string().required("Please Enter Bot Name"),
});

export const RecordSchema = Yup.object({
  meetingName: Yup.string().required("Please Enter Meeting Name"),
  folder: Yup.string().required("Please Select a Folder"),
  meetingUrl: Yup.string()
    .url("Please Enter a valid URL")
    .required("Please Enter Meeting URL"),
});

export const ProfileSchema = Yup.object({
  ename: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Please Enter Name"),
  eemail: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
  emobileNumber: Yup.string()
    .matches(/^[0-9]\d{9}$/, {
      message: "Please enter valid Mobile Number",
      excludeEmptyString: false,
    })
    .required("Please Enter Mobile Number"),
});

export const FolderSchema = Yup.object({
  folderName: Yup.string().required("Please Enter Folder Name"),
  accessType: Yup.string().required("Please Enter Access Type"),
});

export const SignupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Please Enter Name"),
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Please Enter Password"),
  cpassword: Yup.string()
    .min(5, "Confirm password must be at least 5 characters")
    .required("Please Enter Confirm Password")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password not match"
    ),
});

export const AddUserSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Please Enter Name"),
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Please Enter Password"),
});

export const EditUserSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Please Enter Name"),
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
});

export const ShareFolderSchema = Yup.object({
  folder: Yup.string().required("Please Select a Folder"),
});
