import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
/* import { ThemeProvider } from "@mui/material"; */
/* import { theme } from "@/theme/theme"; */

function Layout({ children }: { children: ReactNode }) {
    return (<div className="flex flex-col justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
    </div>)

    /*  return <ThemeProvider theme={theme}>
 <div className="flex flex-col justify-between">
         <Header />
         <main>{children}</main>
         <Footer />
     </div>
     </ThemeProvider>  */
}

export default Layout;
