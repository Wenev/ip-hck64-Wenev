import { useLocation, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import BASE_URL from "../../../BASE_URL";
import { useEffect, useState } from "react";

export default function CollectionDetails() {
    const [collectionCards, setCollectionCards] = useState([])
    const [collectionDetails, setCollectionDetails] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const params = useParams();

    useEffect(() => {
        let ignore = false;

        fetchCollections(ignore);

        return () => (ignore = true);
    }, []);

    const fetchCollections = async (ignore) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `${BASE_URL}/collection/${+params.collectionId}`,
            });
            if(!ignore) {
                setCollectionDetails(data);
                setCollectionCards(data.Cards);
                // calculateTotalPrice(data.Cards);
            }
            console.log(data, collectionCards)
        }
        catch(error) {
            console.log(error)
            swal({
                text: error.response.data.message,
                icon: "error"
            });
        }
    }

    // const calculateTotalPrice = (data) => {
    //     let result = 0;
    //     data.forEach((el) => {
    //         result += +el.data.prices.usd 
    //     });
    //     setTotalPrice(result);
    // }

    return (
        <div className="flex flex-col place-content-center mx-4">
            <div className="flex flex-col text-center rounded-xl bg-slate-700 p-2">
                <h1>{collectionDetails.collectionName}</h1>
                <p>{collectionDetails.description}</p>
                <p>{totalPrice}</p>
            </div>
            <Link to={`/collection/${collectionDetails.id}/add`} className="my-2">
                <button type="button" className="btn btn-outline-light border-none hover:bg-transparent hover:text-yellow-500 hover:underline">Add Card</button>
            </Link>
            <div className="grid xl:lg:grid-rows-4 md:grid-rows-1 gap-3 place-content-center">
                {collectionCards.map(card => {
                    return (
                    <div key={card.id} className="flex flex-col text-justify">
                        <img src="..." className="w-40 h-48"></img>
                        <h2>Name: {card.data.name}</h2>
                        <p>Current Price: {card.data.prices.usd}</p>
                        <p>{card.purchasePrice ? `Purchase Price: ${card.purchasePrice}` : ""}</p>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}