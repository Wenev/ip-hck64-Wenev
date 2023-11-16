import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginForm(() => {
            return {
                ...loginForm,
                [name]: value,
            }
        });
    }
    return (
        <div className="flex flex-row place-content-center grow p-10">
            <form className="flex flex-col">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                    </label>
                    <input
                    onChange={handleChange}
                    type="email"
                    className="form-control xl:w-96 lg:w-80"
                    id="emailInput"
                    name="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                    </label>
                    <input
                    onChange={handleChange}
                    type="password"
                    className="form-control xl:w-96 lg:w-80"
                    id="passwordInput"
                    name="password"
                    />
                </div>
                <button type="submit" className="duration-300 hover:ease-in-out btn btn-primary hover:underline my-2">
                    Login
                </button>
                <Link to={"/sign-up"} className="text-center hover:text-yellow-500 hover:underline my-2">
                    Sign-Up
                </Link>
            </form>
        </div>
    )
}