import { useState } from "react";
import { Link } from "react-router-dom";

export default function CollectionEdit() {
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
    return (
        <div className="flex flex-row place-content-center grow p-10">
            <form className="flex flex-col">
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
                    <textarea class="form-control xl:w-96 lg:w-80" id="decriptionInput" name="description" onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="duration-300 hover:ease-in-out btn btn-primary hover:underline my-2">
                    Add Collection
                </button>
            </form>
        </div>
    )
}