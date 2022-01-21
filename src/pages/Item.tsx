import { useState } from "react";
import { useQuery } from "react-query";
import { Tabset, Tab, Card, Avatar } from "react-rainbow-components";
import request from "../axios";
import Container from "../components/Core/Container";

const durabilityStyles = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  fontSize: "12px",
  fontWeight: 500,
};

const Item = () => {
  const { isLoading, data: administratorItems } = useQuery("fetchRequest", () =>
    request.get("/administrators/items", {
      params: { type: selected },
    })
  );


  const [selected, setSelect] = useState("equipement");

  const handleOnSelect = (event: any, selected: string) => {
    setSelect(selected);
  };

  return (
    <Container>
      <Tabset
        id="tabset-1"
        onSelect={handleOnSelect}
        activeTabName={selected}
        className="rainbow-p-horizontal_x-large"
      >
        <Tab
          label="ÉQUIPEMENT"
          name="equipement"
          id="equipement"
          ariaControls="equipementTab"
        />

        <Tab
          label="CONSOMMABLE"
          name="consommable"
          id="consommable"
          ariaControls="consommableTab"
        />
      </Tabset>
      {administratorItems?.data && administratorItems?.data.items &&
      administratorItems?.data.items.length > 0 ? (
        administratorItems?.data.items.map((item: any, id: number) => {
          return (
            <Card
              key={id}
              icon={<Avatar src={item.imgUrl} size="medium" />}
              title={item.name}
              actions={
                item.durability ? (
                  <div style={durabilityStyles}>
                    <p style={{ marginRight: "10px" }}>
                      Durabilité: {item.durability}
                    </p>
                    <p>Jours utilisé: {item.daysInUse}</p>
                  </div>
                ) : (
                  <div style={durabilityStyles}>
                    <p style={{ marginRight: "10px" }}>
                      Charges: {item.charges}
                    </p>
                    <p>Charges utilisées: {item.usedCharges}</p>
                  </div>
                )
              }
            />
          );
        })
      ) : (
        <p>Vous n'avez aucun {selected}</p>
      )}
    </Container>
  );
};

export default Item;
