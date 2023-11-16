import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col font-mono">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}