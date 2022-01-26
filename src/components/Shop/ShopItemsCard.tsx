import {
  faCoins,
  faHammer,
  faHourglassHalf,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useMemo, useState } from "react";
import { Card, CounterInput } from "react-rainbow-components";
import { Items } from "../../sdk/items";

const cardStyle: CSSProperties = {
  width: 300,
  margin: 10,
  padding: 10,
  display: "flex",
  flexDirection: "column",
};

const headerInfo: CSSProperties = {
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const imgStyle: CSSProperties = {
  height: "40px",
  width: "40px",
  marginRight: 10,
};

const textStyle: CSSProperties = {
  fontSize: 15,
  margin: 10,
};

const iconStyle: CSSProperties = {
  marginLeft: 10,
};

interface Props {
  itemDetails: Items;
  availableBalance?: number;
}

const ShopItemsCard = ({ itemDetails, availableBalance }: Props) => {
  const [counter, setCounter] = useState(0);

  const isDisabled = useMemo(() => {
    // Check if the item is available to purchase
    if (availableBalance) return itemDetails.price > availableBalance;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card style={cardStyle}>
        <div style={headerInfo}>
          <img
            referrerPolicy="no-referrer"
            src={itemDetails.imgUrl}
            style={imgStyle}
          />
          <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: "medium" }}>
                {itemDetails.name}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <p style={textStyle}>
            {itemDetails.price}{" "}
            <FontAwesomeIcon style={iconStyle} icon={faCoins} />
          </p>
          {itemDetails.repairTime && (
            <p style={textStyle}>
              {itemDetails.repairTime}
              <FontAwesomeIcon style={iconStyle} icon={faHammer} />
            </p>
          )}
          {itemDetails.durability && (
            <p style={textStyle}>
              {itemDetails.durability}
              <FontAwesomeIcon style={iconStyle} icon={faHourglassHalf} />
            </p>
          )}
          {itemDetails.charges && (
            <p style={textStyle}>
              {itemDetails.charges}
              <FontAwesomeIcon style={iconStyle} icon={faWeightHanging} />
            </p>
          )}
        </div>
        <CounterInput
          label="Montant"
          placeholder="0"
          className="rainbow-m_auto"
          labelAlignment="center"
          value={counter}
          onChange={setCounter}
          min={0}
          max={100}
          disabled={isDisabled}
        />
      </Card>
    </div>
  );
};

export default ShopItemsCard;
