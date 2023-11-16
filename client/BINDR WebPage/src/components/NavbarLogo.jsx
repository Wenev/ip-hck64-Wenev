import { Link } from "react-router-dom";

export default function NavbarLogo() {
    return (
        <nav className="flex flex-row self-center content-center pb-2 ">
            <Link to={"/"}>
                <h1 className="animate-bounce font-mono text-white text-5xl">BINDR</h1>
            </Link>
        </nav>
    )
}