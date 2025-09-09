import React, { useState } from "react";
// Import bootstrap react components
import { Button, Container } from "react-bootstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
// import framer motion
import { motion } from "framer-motion";
import AnimationTitles from "../components/functions/AnimationTitles";
import Property from "../components/Property";

const Properties = () => {

    const tabs = ["All", "Cottage", "Chalet", "Manor", "Penthouse", "Farmhouse", "Duplex"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const properties = [
        {
            type: "Cottage",
            image: require("../images/properties/picture-of-a-wooden-building-in-the-forest.webp"),
            title: "Cottage «Forrest 1»",
            description: "@Red Oak Realty",
            countDown: { h: 9, m: 45, s: 8 },
            currentBid: 29.71
        },
        {
            type: "Chalet",
            image: require("../images/properties/pexels-stan-krotov-12737424 1.webp"),
            title: "Freshness",
            description: "@US California Real Estate",
            countDown: { h: 29, m: 15, s: 10 },
            currentBid: 14.81
        },
        {
            type: "Manor",
            image: require("../images/properties/pexels-rachel-claire-8112843 1.webp"),
            title: "Wish house",
            description: "@Norway estate agency",
            countDown: { h: 23, m: 6, s: 1 },
            currentBid: 16.62
        },
        {
            type: "Penthouse",
            image: require("../images/properties/david-kovalenko-9-qFzV9a2Zc-unsplash.webp"),
            title: "Spruce",
            description: "@Dream House",
            countDown: { h: 10, m: 30, s: 58 },
            currentBid: 17.01
        },
        {
            type: "Farmhouse",
            image: require("../images/properties/house_big-1.webp"),
            title: "Residence Rybna",
            description: "@Ukraine estate agency",
            countDown: { h: 18, m: 21, s: 8 },
            currentBid: 29.71
        },
        {
            type: "Duplex",
            image: require("../images/properties/house_big.webp"),
            title: "Blue Sky",
            description: "@US New York Real Estate",
            countDown: { h: 23, m: 16, s: 11 },
            currentBid: 17.31
        },
        {
            type: "Chalet",
            image: require("../images/properties/pexels-stan-krotov-12737424 1.webp"),
            title: "Freshness",
            description: "@US Los Angeles Real Estate",
            countDown: { h: 29, m: 15, s: 10 },
            currentBid: 14.81
        },
        {
            type: "Farmhouse",
            image: require("../images/properties/house_big.webp"),
            title: "Blue Sky",
            description: "@Brazil Real Estate",
            countDown: { h: 23, m: 16, s: 11 },
            currentBid: 17.31
        },
        {
            type: "Duplex",
            image: require("../images/properties/pexels-rachel-claire-8112843 1.webp"),
            title: "Wish house",
            description: "@Portugal estate agency",
            countDown: { h: 23, m: 6, s: 1 },
            currentBid: 16.62
        },
        {
            type: "Cottage",
            image: require("../images/properties/house_big-1.webp"),
            title: "Residence Rybna",
            description: "@France estate agency",
            countDown: { h: 18, m: 21, s: 8 },
            currentBid: 29.71
        },
    ]

    const propertiesToShow = activeTab === tabs[0] ? properties : properties.filter((property) => property.type === activeTab);

    return (
        // Start properties
        <div className="properties">
            <Container>
                <AnimationTitles
                    className="title mx-auto"
                    title="Discover more properties"
                />
                {/* Start tabs */}
                <div className="tabs d-flex justify-content-start justify-content-sm-center align-items-center flex-nowrap w-lg-50">
                    <Swiper
                        className="mySwiper overflow-none"
                        grabCursor={true}
                        spaceBetween={15}
                        slidesPerView={6}
                        breakpoints={{
                            0: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 6,
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <SwiperSlide key={index}>
                                <Button
                                    className={`ms-0 bg-black-100 border-0 ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </Button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* End tabs */}
                {/* Start cards */}
                <motion.div
                    initial={{ x: -80 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={15}
                        grabCursor={true}
                        loop={true}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            520: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            992: {
                                slidesPerView: 4,
                            },
                            1198: {
                                slidesPerView: 5,
                            },
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper mt-4"
                    >
                        {propertiesToShow.map((property, index) => (
                            <SwiperSlide key={index}>
                                <Property {...property} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
                {/* End cards */}
            </Container>
        </div>
    );
}

export default Properties;
