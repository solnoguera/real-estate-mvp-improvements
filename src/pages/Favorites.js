import { Container } from "react-bootstrap";
import AnimationTitles from "../components/functions/AnimationTitles";
import Property from "../components/Property";

const Favorites = () => {
    const listFavorites = localStorage.getItem("likedProperties");
    const listFavoritesArray = listFavorites ? JSON.parse(listFavorites) : [];
    console.log('listFavoritesArray', listFavoritesArray);
    return (
        <Container className="mt-5">
            <AnimationTitles title="Favorite Properties" className="text-white" />
            {listFavoritesArray.map((property) => (
                <Property key={property.id} {...property} hideLikedButton />
            ))}
            {listFavoritesArray.length === 0 && (
                <p className="text-white mt-4">No favorite properties</p>
            )}
        </Container>
    )
}

export default Favorites;