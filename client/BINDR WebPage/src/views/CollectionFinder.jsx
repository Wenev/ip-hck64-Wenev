import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import swal from "sweetalert";
import axios from "axios";
import BASE_URL from "../../../BASE_URL";
import { Link } from "react-router-dom";

export default function CollectionFinder() {
    const [collectionLength, setCollectionLength] = useState(0)
    const [collections, setCollections] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        let ignore = false;

        fetchCollections(ignore);

        return () => (ignore = true);
    }, [search, page]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value);
    }



    const fetchCollections = async (ignore) => {
        try {
            const { data } = await axios({
               method: "get",
               url: `${BASE_URL}/collections`,
               params: {
                search: search,
                page: page
               } 
            });

            if(!ignore) {
                setCollections(data.data);
                setCollectionLength(data.length);
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
        <div className="flex flex-col place-content-center m-4">
            <form className="mb-4">       
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <input
                    onChange={handleChange}
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8"
                    placeholder="Search Collection Name"
                    required=""
                    name="search"
                    />
                    <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Collection Name</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map(collection => {
                        return (
                            <tr key={collection.id}>
                                <Link to={`/pub/collection/${collection.id}`}>
                                    <td>
                                        {collection.collectionName}
                                    </td> 
                                </Link>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}