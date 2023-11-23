import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../BASE_URL";
import swal from "sweetalert"

export default function CollectionAdd() {
    const navigate = useNavigate();
    const [collectionForm, setCollectionForm] = useState({
        collectionName: "",
        description: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCollectionForm(() => {
            return {
                ...collectionForm,
                [name]: value,
            }
        });
    }
    const handleCollectionAdd = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "post",
                url: `${BASE_URL}/collections`,
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                },
                data: {
                    collectionName: collectionForm.collectionName,
                    description: collectionForm.description
                }
            });
            swal({
                text: data,
                icon: "success"
            })
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
            <form onSubmit={handleCollectionAdd} className="flex flex-col">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Collection Name
                    </label>
                    <input
                    onChange={handleChange}
                    type="text"
                    className="form-control xl:w-96 lg:w-80"
                    id="emailInput"
                    name="collectionName"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                    </label>
                    <textarea className="form-control xl:w-96 lg:w-80" id="decriptionInput" name="description" onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="duration-300 hover:ease-in-out btn btn-primary hover:underline my-2">
                    Add Collection
                </button>
            </form>
        </div>
    )
}