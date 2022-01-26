import { faCoins, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import { Fragment, useContext, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, ButtonIcon, Card } from "react-rainbow-components";
import request from "../../axios";
import { ShoppingCartContext } from "../../contexts/shop/shop.context";
import { Cart } from "../../sdk/shop";

const ShopCart = () => {
  const { products, removeProductFromCart } = useContext(ShoppingCartContext);
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<AxiosResponse, Error, Cart>(
    (params) => request.put(`/items/buy`, params),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const convertedData = useMemo(() => {
    return products?.map((x) => ({
      itemId: x._id,
      quantity: x.quantity,
    }));
  }, [products]);

  return (
    <Fragment>
      <Card
        style={{
          borderColor: "rgb(0, 205, 165)",
          width: "210px",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 8,
          position: "fixed",
          top: "35%",
          right: 15,
        }}
      >
        <p style={{ fontWeight: 700, fontSize: "medium" }}>Votre panier</p>
        <ul>
          {products &&
            products.map((item, index) => (
              <li key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <strong>{item.name}</strong>
                  <p>
                    {item.quantity}x{item.price}{" "}
                    <FontAwesomeIcon icon={faCoins} />
                  </p>
                  <ButtonIcon
                    variant="destructive"
                    size="small"
                    tooltip="Supprimer"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={removeProductFromCart?.bind(this, item._id)}
                  />
                </div>
              </li>
            ))}
        </ul>
        <Button
          type="submit"
          isLoading={isLoading}
          variant="success"
          size="small"
          label="Acheter"
          onClick={async () => {
            await mutateAsync({ cart: convertedData });
          }}
        />
      </Card>
    </Fragment>
  );
};

export default ShopCart;
