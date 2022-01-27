import { useState } from "react";
import { useQuery } from "react-query";
import { Pagination, Tab, Tabset } from "react-rainbow-components";
import request from "../../axios";
import { Administrators } from "../../sdk/administrator";
import { ItemsList, ItemsType } from "../../sdk/items";
import ShopItemsCard from "./ShopItemsCard";

const PAGE_SIZE: number = 12;

async function fetchEquipments(offset: number) {
  const { data } = await request.get<ItemsList>(
    `items?type=${ItemsType.EQUIPMENT}&limit=${PAGE_SIZE}&offset=${offset}`
  );
  return data;
}

async function fetchConsumables(offset: number) {
  const { data } = await request.get<ItemsList>(
    `items?type=${ItemsType.CONSUMABLE}&limit=${PAGE_SIZE}&offset=${offset}`
  );
  return data;
}

const ShopItemList = () => {
  const [offset, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [selected, setSelected] = useState(ItemsType.EQUIPMENT);

  const { data: shopEquipments } = useQuery(
    ["fetchShopEquipments", offset],
    () => fetchEquipments(offset),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const { data: shopConsumables } = useQuery(
    ["fetchShopConsumables", offset],
    () => fetchConsumables(offset),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const { data: admin } = useQuery("fetchAdmin", () =>
    request.get<Administrators>("administrators")
  );

  const handleOnSelect = (event: any, name: string) => {
    setSelected(name as ItemsType);
    setActivePage(1);
    setOffset(0);
  };

  const handleChangePage = (event: any, page: number) => {
    if (page > activePage) {
      setOffset(offset + 1);
      setActivePage(page);
    } else if (page < activePage) {
      setOffset(offset - 1);
      setActivePage(page);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Tabset
          variant="line"
          onSelect={handleOnSelect}
          activeTabName={selected}
        >
          <Tab name={ItemsType.EQUIPMENT} label="Equipements" />
          <Tab name={ItemsType.CONSUMABLE} label="Consommables" />
          <p style={{ marginLeft: "auto" }}>
            Stock disponible d'items : {shopEquipments?.counts}
          </p>
        </Tabset>
        {selected === ItemsType.CONSUMABLE &&
          shopConsumables &&
          shopConsumables.items.map((result) => {
            return (
              <ShopItemsCard
                key={result._id}
                itemDetails={result}
                availableBalance={admin?.data.wallet}
              />
            );
          })}
        {selected === ItemsType.EQUIPMENT &&
          shopEquipments &&
          shopEquipments.items.map((result) => {
            return (
              <ShopItemsCard
                key={result._id}
                itemDetails={result}
                availableBalance={admin?.data.wallet}
              />
            );
          })}
      </div>
      {selected === ItemsType.EQUIPMENT && shopEquipments && (
        <Pagination
          className="rainbow-m-around_medium"
          pages={Math.ceil(shopEquipments.counts / PAGE_SIZE)}
          activePage={activePage}
          onChange={handleChangePage}
        />
      )}
      {selected === ItemsType.CONSUMABLE && shopConsumables && (
        <Pagination
          className="rainbow-m-around_medium"
          pages={Math.ceil(shopConsumables.counts / PAGE_SIZE)}
          activePage={activePage}
          onChange={handleChangePage}
        />
      )}
    </>
  );
};

export default ShopItemList;
