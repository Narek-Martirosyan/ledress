import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="content" style={{ minHeight: "70vh" }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}