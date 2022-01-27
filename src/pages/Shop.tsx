import { useContext } from "react";
import Container from "../components/Core/Container";
import ShopCart from "../components/Shop/ShopCart";
import ShopItemList from "../components/Shop/ShopItemList";
import { ShoppingCartContext } from "../contexts/shop/shop.context";

const Shop = () => {
  const { products } = useContext(ShoppingCartContext);
  return (
    <Container>
      <h1>Magasin d'équipements et consommables</h1>
      <ShopItemList />
      {products && products.length > 0 && <ShopCart />}
    </Container>
  );
};

export default Shop;
