import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
