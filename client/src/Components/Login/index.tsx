

function Login() {



    return (
        <form style={{ display: 'flex', flexDirection: 'column', rowGap: '1em' }}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" />
            </div>
            <button>Login</button>
        </form>
    );
}

export default Login;
