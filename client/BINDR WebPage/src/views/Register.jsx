import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="flex flex-row place-content-center grow p-10">
            <form className="grid xl:lg:grid-cols-2 sm:grid-cols-1 gap-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    First Name
                    </label>
                    <input
                    type="text"
                    className="form-control xl:w-96 lg:w-80 sm:w-60"
                    id="firstNameInput"
                    name="firstName"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Second Name
                    </label>
                    <input
                    type="text"
                    className="form-control xl:w-96 lg:w-80 sm:w-60"
                    id="secondNameInput"
                    name="secondName"
                    />
                </div>
                <div className="xl:lg:md:col-span-2 mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Username
                    </label>
                    <input
                    type="text"
                    className="form-control xl:w-full"
                    id="usernameInput"
                    name="username"
                    />
                </div>
                <div className="xl:lg:md:col-span-2 mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                    </label>
                    <input
                    type="email"
                    className="form-control xl:w-full"
                    id="emailInput"
                    name="email"
                    />
                </div>
                <div className="xl:lg:md:col-span-2 mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                    </label>
                    <input
                    type="password"
                    className="form-control xl:full"
                    id="passwordInput"
                    name="password"
                    />
                </div>
                <button type="submit" className="xl:lg:md:col-span-2 duration-300 hover:ease-in-out btn btn-success hover:underline my-1">
                    Sign Up
                </button>
            </form>
        </div>
    )
}