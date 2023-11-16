import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../BASE_URL";
import Swal from "sweetalert2";
import swal from "sweetalert";

export default function Login() {
    const navigate = useNavigate();
    async function handleCredentialResponse(response) {
        const { data } = await axios({
            method: "post",
            url: `${BASE_URL}/auth/google`,
            headers: {
                g_token: response.credential
            }
        });
        localStorage.setItem("access_token", data.access_token);
        navigate("/")
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "868348904025-6q9omk46h474gjvg3qhtjvag0kj118lp.apps.googleusercontent.com",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          google.accounts.id.prompt();
    }, []);
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
    const handleLoginForm = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "post",
                url: `${BASE_URL}/login`,
                data: loginForm
            });

            localStorage.setItem("access_token", data.access_token);
            navigate("/")
        }
        catch(error) {
            swal({
                text: `${error.response.data.message}`,
                icon: "error"
            });
        }
    }
    return (
        <div className="flex flex-row place-content-center grow p-10">
            <form onSubmit={handleLoginForm} className="flex flex-col">
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
                <div id="buttonDiv"></div>
            </form>
        </div>
    )
}