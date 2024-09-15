import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col justify-between">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
