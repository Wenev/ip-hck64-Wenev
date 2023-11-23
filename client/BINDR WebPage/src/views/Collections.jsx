import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import BASE_URL from "../../../BASE_URL";
import { Link } from "react-router-dom";


export default function Collections() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        let ignore = false;

        fetchCollections(ignore);

        return () => (ignore = true);
    }, []);

    const fetchCollections = async (ignore) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `${BASE_URL}/collections/${localStorage.username}`,
            });

            if(!ignore) {
                setCollections(data);
            }
        }
        catch(error) {
            swal({
                text: error.response.data.message,
                icon: "error"
            });
        }
    }

    return (
        <div className="flex flex-col text-center">
            <h1 className="font-bold">Your Collection</h1>
            <Link to="/collection/add" className="my-2">
                <button type="button" className="btn btn-outline-light border-none hover:bg-transparent hover:text-yellow-500 hover:underline">Add Collection</button>
            </Link>
            <div className="grid xl:lg:grid-rows-4 md:grid-rows-1 gap-3 place-content-center m-4">
                <div className="flex flex-col text-justify">
                {collections.map(collection => {
                    return (
                        <Link key={collection.id} to={`/collection/${collection.id}`} className="my-2 text-lime-200 hover:text-lime-400">
                            <h1>{collection.collectionName}</h1>
                        </Link>
                    )
                })}
                </div>
            </div>
        </div>
    )
}