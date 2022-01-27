import { FC, createContext, useContext, useState } from "react";
import { Items } from "../../sdk/items";

type ShoppingCartContextProps = {
  products: Items[];
  addProductToCart: (product: Items) => void;
  removeProductFromCart: (productId: string) => void;
};

export const ShoppingCartContext = createContext<
  Partial<ShoppingCartContextProps>
>({});

export const ShoppingCartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<Items[]>([]);

  const addProductToCart = (product: Items) => {
    if (cart.length === 0) {
      setCart([product]);
    } else if (!cart.find((item) => item._id === product._id)) {
      // add to existing list of items
      setCart([...cart, product]);
    } else {
      // increment quantity to already add item
      const index = cart.findIndex((item) => item._id === product._id);
      cart.splice(index, 1, product);
      setCart([...cart]);
    }
  };

  const removeProductFromCart = (productId: string) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        products: cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
