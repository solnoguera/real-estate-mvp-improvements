import { Container, Row, Col } from "react-bootstrap";
import AnimationTitles from "../components/functions/AnimationTitles";
import Property from "../components/Property";

const Favorites = () => {
    const listFavorites = localStorage.getItem("likedProperties");
    const listFavoritesArray = listFavorites ? JSON.parse(listFavorites) : [];
    
    return (
        <Container className="my-5">
            <AnimationTitles title="Favorite Properties" className="text-white mb-5 text-center" />
            <Container className="d-flex justify-content-center">
                <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
                    {listFavoritesArray.map((property) => (
                        <Col key={property.id} style={{ width: 'fit-content' }}>
                            <Property {...property} hideLikedButton />
                        </Col>
                    ))}
                </Row>
                {listFavoritesArray.length === 0 && (
                    <p className="text-white mt-4">No favorite properties</p>
                )}
            </Container>
        </Container>
    )
}

export default Favorites;