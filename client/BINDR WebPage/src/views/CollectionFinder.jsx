import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function CollectionFinder() {
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(() => {
            return {
                value
            }
        });
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
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Collection Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    </tr>
                    <tr>
                        <td>Witchy Woman</td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}