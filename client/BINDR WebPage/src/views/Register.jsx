import { Link } from "react-router-dom";

export default function Register() {
    const [registerForm, setRegisterForm] = useState({
        firstName: "",
        secondName: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterForm(() => {
            return {
                ...registerForm,
                [name]: value,
            }
        });
    }
    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "post",
                url: `${BASE_URL}/register`,
                data: registerForm
            });

            localStorage.setItem("access_token", data.access_token);
            navigate("/");
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
            <form onSubmit={handleRegister} className="grid xl:lg:grid-cols-2 sm:grid-cols-1 gap-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    First Name
                    </label>
                    <input
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    type="password"
                    className="form-control xl:full"
                    id="passwordInput"
                    name="password"
                    />
                </div>
                <button type="submit" className="xl:lg:md:col-span-2 duration-300 hover:ease-in-out btn btn-success hover:underline my-1">
                    Sign Up
                </button>
                <Link to={"/login"} className="xl:lg:md:col-span-2 text-center hover:text-yellow-500 hover:underline my-2">
                    Login
                </Link>
            </form>
        </div>
    )
}