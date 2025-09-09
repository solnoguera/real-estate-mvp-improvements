import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CountDown from './functions/CountDown';

const Property = ({ id, image, title, description, countDown, currentBid, currency = 'ETH', hideLikedButton = false }) => {
    
    const likedProperties = localStorage.getItem('likedProperties');
    const likedPropertiesArray = JSON.parse(likedProperties) || [];
    const isLiked = likedPropertiesArray.some((property) => property.id === id);
    
    const [liked, setLiked] = useState(isLiked);

    const onLiked = () => {
        const newState = !liked;
        setLiked(newState);
        const propertyToAddOrRemove = { id, image, title, description, countDown, currentBid, currency };
        const likedProperties = localStorage.getItem('likedProperties');
        const likedPropertiesArray = JSON.parse(likedProperties) || [];

        // If liked
        if (newState) {
            likedPropertiesArray.push(propertyToAddOrRemove);
            localStorage.setItem('likedProperties', JSON.stringify(likedPropertiesArray));
        } else {
            const filteredLikedPropertiesArray = likedPropertiesArray.filter((property) => property.id !== propertyToAddOrRemove.id);
            localStorage.setItem('likedProperties', JSON.stringify(filteredLikedPropertiesArray));
        }
    }

    return (
        <Card className="bg-black-100 rounded">
            <Card.Body className="p-2">
                <div className="rounded overflow-hidden position-relative">
                    <Card.Img
                        variant="top"
                        alt="Mark as favorite"
                        src={image}
                    />
                    {!hideLikedButton && (
                        <i
                        className={liked ? "fa-solid fa-heart like text-danger" : "fa-regular fa-heart like"}
                            onClick={onLiked}
                        ></i>
                    )}
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