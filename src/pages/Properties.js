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

function Properties() {
    // Active on select a tab
    function active(e) {
        let act = document.querySelectorAll(".active");
        act[0].classList.remove("active");
        e.target.classList.add("active");
    }

    const properties = [
        {
            image: require("../images/properties/picture-of-a-wooden-building-in-the-forest.webp"),
            title: "Cottage «Forrest 1»",
            description: "@Red Oak Realty",
            countDown: { h: 9, m: 45, s: 8 },
            currentBid: 29.71
        },
        {
            image: require("../images/properties/pexels-stan-krotov-12737424 1.webp"),
            title: "Freshness",
            description: "@US California Real Estate",
            countDown: { h: 29, m: 15, s: 10 },
            currentBid: 14.81
        },
        {
            image: require("../images/properties/pexels-rachel-claire-8112843 1.webp"),
            title: "Wish house",
            description: "@Norway estate agency",
            countDown: { h: 23, m: 6, s: 1 },
            currentBid: 16.62
        },
        {
            image: require("../images/properties/david-kovalenko-9-qFzV9a2Zc-unsplash.webp"),
            title: "Spruce",
            description: "@Dream House",
            countDown: { h: 10, m: 30, s: 58 },
            currentBid: 17.01
        },
        {
            image: require("../images/properties/house_big-1.webp"),
            title: "Residence Rybna",
            description: "@Ukraine estate agency",
            countDown: { h: 18, m: 21, s: 8 },
            currentBid: 29.71
        },
        {
            image: require("../images/properties/house_big.webp"),
            title: "Blue Sky",
            description: "@US New York Real Estate",
            countDown: { h: 23, m: 16, s: 11 },
            currentBid: 17.31
        },
        {
            image: require("../images/properties/pexels-stan-krotov-12737424 1.webp"),
            title: "Freshness",
            description: "@US Los Angeles Real Estate",
            countDown: { h: 29, m: 15, s: 10 },
            currentBid: 14.81
        },
        {
            image: require("../images/properties/house_big.webp"),
            title: "Blue Sky",
            description: "@Brazil Real Estate",
            countDown: { h: 23, m: 16, s: 11 },
            currentBid: 17.31
        },
        {
            image: require("../images/properties/pexels-rachel-claire-8112843 1.webp"),
            title: "Wish house",
            description: "@Portugal estate agency",
            countDown: { h: 23, m: 6, s: 1 },
            currentBid: 16.62
        },
        {
            image: require("../images/properties/house_big-1.webp"),
            title: "Residence Rybna",
            description: "@France estate agency",
            countDown: { h: 18, m: 21, s: 8 },
            currentBid: 29.71
        },
    ]
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
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0"
                                onClick={active}
                            >
                                All
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0 active"
                                onClick={active}
                            >
                                Cottage
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0"
                                onClick={active}
                            >
                                Chalet
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0"
                                onClick={active}
                            >
                                Manor
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0"
                                onClick={active}
                            >
                                Penthouse
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0"
                                onClick={active}
                            >
                                Farmhouse
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                className="ms-0 bg-black-100 border-0"
                                onClick={active}
                            >
                                Duplex
                            </Button>
                        </SwiperSlide>
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
                        {properties.map((property, index) => (
                            <SwiperSlide key={index}>
                                <Property {...property} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
                {/* End cards */}
            </Container>
        </div>
        // End properties
    );
}

export default Properties;
