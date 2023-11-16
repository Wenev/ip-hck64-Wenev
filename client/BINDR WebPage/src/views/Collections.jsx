import { Link } from "react-router-dom";

export default function Collections() {
    return (
        <div className="flex flex-col text-center">
            <h1 className="font-bold">Your Collection</h1>
            <div className="grid xl:lg:grid-rows-4 md:grid-rows-1 gap-3 place-content-center m-4">
                <div className="flex flex-col text-justify">
                    <Link to="/collection/12">
                        <h1>Name: </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}