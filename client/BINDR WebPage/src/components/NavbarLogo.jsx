import { Link } from "react-router-dom";

export default function NavbarLogo() {
    return (
        <nav className="animate-bounce flex flex-col self-center xl:lg:my-8 mt-11">
            <Link to={"/"}>
                <h1 className="font-mono text-white text-5xl">BINDR</h1>
            </Link>
        </nav>
    )
}