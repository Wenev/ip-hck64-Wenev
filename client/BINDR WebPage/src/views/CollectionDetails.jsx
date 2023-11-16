import { Link } from "react-router-dom";

export default function CollectionDetails() {
    return (
        <div className="flex flex-col place-content-center mx-4">
            <div className="flex flex-col text-center rounded-xl bg-slate-700 p-2">
                <h1>Title</h1>
                <p>desc</p>
                <p>total price</p>
            </div>
            <Link to="/collection/:collectionId/add" className="my-2">
                <button type="button" className="btn btn-outline-light border-none hover:bg-transparent hover:text-yellow-500 hover:underline">Add Card</button>
            </Link>
            <div className="grid xl:lg:grid-rows-4 md:grid-rows-1 gap-3 place-content-center">
                <div className="flex flex-col text-justify">
                    <img src="..." className="w-40 h-48"></img>
                    <h2>Name: </h2>
                    <p>Purchase Price: </p>
                    <p>Owned From: </p>
                </div>
            </div>
        </div>
    )
}