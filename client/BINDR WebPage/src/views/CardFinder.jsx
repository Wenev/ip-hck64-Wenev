import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../BASE_URL";
import swal from "sweetalert"

export default function CardFinder() {
    const navigate = useNavigate();
    const params = useParams();
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value);
    }

    const fetchCards = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "get",
                url: `${BASE_URL}/cards`,
                params: {
                    search: search,
                },
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            });
            console.log(data.data)
            setCards(data.data);
        }
        catch(error) {
            swal({
                text: `${error.response.data.message}`,
                icon: "error"
            });
        }
    }

    const handleAddCard = async (CardId) => {
        try {
            const { data } = await axios({
                method: "post",
                url: `${BASE_URL}/collection/${params.collectionId}`,
                data: {
                    CardId: CardId
                },
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            });

            swal({
                text: `${data.message}`,
                icon: "success"
            });
            navigate(`/collection/${params.collectionId}`);
        }
        catch(error) {
            swal({
                text: `${error.response.data.message}`,
                icon: "error"
            });
        }
    }

    return (
        <div className="flex flex-col place-content-center m-4">
            <form onSubmit={fetchCards} className="mb-4">       
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
                    placeholder="Search Card Name"
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
            <div className="grid xl:lg:grid-rows-4 md:grid-rows-1 gap-3 place-content-center">
                {cards.map((card) => {
                    return (
                    <div key={card.id} className="flex flex-col text-justify">
                        <img src={card.image_uris.png} className="h-70 w-56 my-3"></img>
                        <div className="grid grid-row-2 gap-2 w">
                            <button onClick={() => handleAddCard(card.id)} type="button" className="btn btn-success">
                                Add Card
                            </button>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}