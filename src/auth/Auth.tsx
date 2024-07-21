import { useFormik } from "formik";
import style from "./auth.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../input/Input";
import * as Yup from "yup";
import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/auth/authActons";

export interface IFormValues {
  username: string;
  password: string;
}

export interface IUserData {
  id: number;
  gender: string;
  email: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  token: string;
  image: string;
}
const initial = {
  id: 0,
  gender: "",
  email: "",
  firstName: "",
  lastName: "",
  refreshToken: "",
  token: "",
  image: "",
};

const schema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("Required")
    .min(3, "Too Short")
    .max(15, "Too Long"),
  password: Yup.string()
    .trim()
    .required("Required")
    .min(3, "Too Short")
    .max(15, "Too Long"),
});

export default function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "emilys",
      password: "emilyspass",
    } as IFormValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values: IFormValues, { resetForm }) => {
      dispatch(loginUser(values));
      console.log("data:", values);
      resetForm();
      navigate("/");
    },
  });
  return (
    <div className={style["auth-container"]}>
      <span>Formic auth</span>
      <p>emilys</p>
      <p>emilyspass</p>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name={"username"}
          onChange={formik.handleChange}
          placeholder={"username"}
          type={"text"}
          value={formik.values.username}
        />
        <Input
          name={"password"}
          onChange={formik.handleChange}
          placeholder={"password"}
          type={"text"}
          value={formik.values.password}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
function lodinUser(values: IFormValues): any {
  throw new Error("Function not implemented.");
}
