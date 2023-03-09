import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './style.scss'
import AuthService from "../../services/auth.service";

interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    username: string,
    password: string,
    loading: boolean,
    message: string
};

function Login(props: Props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    function validationSchema() {
        return Yup.object().shape({
            username: [Yup.Schema],
            password: [Yup.Schema],
        });
    }

    function handleLogin(formValue: { username: string, password: string }) {
        const { username, password } = formValue;

        setMessage("")
        setLoading(true)


        AuthService.login(username, password).then(
            () => {
                props.history.push("/profile");
                window.location.reload();
            },
            (error:any) => {
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            <Form>
                <div>
                    <label htmlFor="username">Password</label>
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
    );
}


export default Login;
