enum Routes {
  HOME = "/requests",
  LOGIN = "/login",
  ADVENTURERS = "/adventurers",
  ADVENTURER = "/adventurers/:id",
  ITEMS = "/items",
  ITEM = "/items/:id",
  QUESTS = "/quests",
  QUEST = "/quests/:id",
  SHOPS = "/shop-items",
  SHOP = "/shop-items/:id",
}
export default Routes;

export interface MenuItem {
  label: string;
  to: Routes;
}
