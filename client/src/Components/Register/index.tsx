import './style.scss'

import { Formik, Field, Form, ErrorMessage } from "formik";
import { object, string, number, date, InferType } from 'yup';
import authService from '../../services/auth.service';
import { useState } from 'react';

type Props = {};

type State = {
    username: string,
    email: string,
    password: string,
    successful: boolean,
    message: string
};

function Register(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [successful, setSuccessful] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const initialValues = {
        username: "",
        email: "",
        password: "",
        balance: 0
    };
    function validationSchema() {
        return object({
            username: string()
                .test(
                    "len",
                    "The username must be between 3 and 20 characters.",
                    (val: any) => {
                        return (
                            val &&
                            val.toString().length >= 3 &&
                            val.toString().length <= 20
                        )
                    }
                ).required("This field is required."),
            email: string()
                .email("This is not a valid email.")
                .required("This field is required."),
            password: string()
                .test(
                    "len",
                    "The password must be between 6 and 30 characters.",
                    (val: any) => {
                        return (
                            val &&
                            val.toString().length >= 6 &&
                            val.toString().length <= 30
                        )
                    }
                ).required("This field is required."),
            balance: number().test(
                ">=0",
                "Your balance must be a positive number",
                (val: any) => {
                    return (
                        (val && val >= 0.00)
                    )
                }
            ).default(0.00)
        })
    }

    function handleRegister(formValue: { username: string; email: string; password: string; balance: number }) {
        const { username, email, password, balance } = formValue;

        () => {
            setMessage("");
            setSuccessful(false);
        }

        authService.register(
            username,
            email,
            password,
            balance
        ).then((res) => {
            setMessage(res.data.message);
            setSuccessful(true);
        }, (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setSuccessful(false);
            setMessage(resMessage);
        })
    }



    return (
        <div className='container'>

            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username"> Username </label>
                                        <Field name="username" type="text" className="form-control" />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email"> Email </label>
                                        <Field name="email" type="email" className="form-control" />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password"> Password </label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="balance"> Current Balance </label>
                                        <Field
                                            name="balance"
                                            type="balance"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="balance"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;