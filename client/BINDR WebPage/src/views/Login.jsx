import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex flex-row place-content-center grow p-10">
            <form className="flex flex-col">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                    </label>
                    <input
                    type="email"
                    className="form-control xl:w-96 lg:w-80"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                    </label>
                    <input
                    type="password"
                    className="form-control xl:w-96 lg:w-80"
                    id="exampleInputPassword1"
                    />
                </div>
                <button type="submit" className="duration-300 hover:ease-in-out btn btn-primary hover:underline my-1 ">
                    Login
                </button>
                <Link to={"/sign-up"} className="hover:text-yellow-500 hover:underline my-1">
                    Sign-Up
                </Link>
            </form>
        </div>
    )
}