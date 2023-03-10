import { SetStateAction, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import AuthService from "../../services/auth.service";
import './style.scss'
import { Navigate } from 'react-router-dom';

interface RouterProps {
    history: string;
}

type Props = {};

type State = {
    username: string,
    password: string,
    loading: boolean,
    message: string
};

function Login(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [redirect, setRedirect] = useState<string | undefined>();


    function validationSchema() {
        return object({
            username: string().required("This field is required"),
            password: string().required("This field is required")
        });
    }

    function handleLogin(formValue: { username: string, password: string }) {
        const { username, password } = formValue;

        () => {
            setMessage("")
            setLoading(true)
        }

        AuthService.login(username, password).then(
            () => {
                setRedirect("/profile");
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    }

    const initialValues = {
        username: "",
        password: "",
    };

    return (
        <>
            {
                redirect && <Navigate to={redirect} />
            }
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <div>
                        <button type="submit" disabled={loading}>
                            Login
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}


export default Login;
