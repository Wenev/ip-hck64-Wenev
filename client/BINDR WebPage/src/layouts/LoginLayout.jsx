import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarLogo from "../components/NavbarLogo";

export default function LoginLayout() {
    return (
        <div className="flex flex-col font-mono">
            <NavbarLogo />
            <Outlet />
            <Footer />
        </div>
    )
}