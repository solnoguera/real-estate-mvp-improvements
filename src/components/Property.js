import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CountDown from './functions/CountDown';

const Property = ({ image, title, description, countDown, currentBid, currency = 'ETH' }) => {
    const [liked, setLiked] = useState(false);

    return (
        <Card className="bg-black-100 rounded">
            <Card.Body className="p-2">
                <div className="rounded overflow-hidden position-relative">
                    <Card.Img
                        variant="top"
                        alt="Mark as favorite"
                        src={image}
                    />
                    <i
                        className={liked ? "fa-solid fa-heart like text-danger" : "fa-regular fa-heart like"}
                        onClick={() => setLiked(!liked)}
                    ></i>
                </div>
                <h5 className="mt-2 text-white fw-normal">
                    {title}
                </h5>
                <p className="gray-90">{description}</p>
                <div className="d-flex">
                    <div className="me-3">
                        <CountDown h={countDown.h} m={countDown.m} s={countDown.s} />
                        <span className="gray-90">
                            Remaining Time
                        </span>
                    </div>
                    <div>
                        <h6 className="text-white">
                            {currentBid} {currency}
                        </h6>
                        <span className="gray-90">
                            Current Bid
                        </span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Property;