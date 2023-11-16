import { useLocation } from "react-router-dom"
import GithubLogo from "../assets/github-mark-white.png"

export default function Home() {
    return (
        <div className="flex flex-col place-content-center grow m-4">
            <div className="bg-slate-900 rounded-xl p-20">
                <h1 className="font-bold text-center xl:lg:text-xl md:text-base">Hello World...</h1>
                <div className="font-medium text-center xl:lg:text-lg md:text-md sm:text-sm mt-4">
                    <p>
                        This is a small personal project that combines my love for
                        Magic: The Gathering and Programming. 
                    </p>
                    <p>
                        This is inspired by
                        card binders, where you can show off your collection to other 
                        people.
                    </p>
                    <p>
                        I would really appreciate it if you would checkout 
                        some of my other projects.
                    </p>
                </div>
                <div className="flex flex-row place-content-center m-4">
                    <a href="https://github.com/Wenev">
                        <img src={GithubLogo} className="w-12 h-12"/>
                    </a>
                </div>
            </div>
        </div>
    )
}