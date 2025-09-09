import React from "react";
import Partners from "./Partners";
import Properties from "./Properties";
import AboutUs from "./AboutUs";
import Developers from "./Developers";
import Join from "./Join";
import Subscribe from "./Subscribe";
import Footer from "./Footer";
import Loading from "./Header";

const Home = () => {
    return (
        <>
            <Loading />
            <Partners />
            <Properties />
            <AboutUs />
            <Developers />
            <Join />
            <Subscribe />
            <Footer />
        </>
    )
}

export default Home;