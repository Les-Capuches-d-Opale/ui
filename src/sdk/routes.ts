enum Routes {
  HOME = "/home",
  LOGIN = "/login",
  REQUESTS = "/requests",
  REQUEST = "/requests/:id",
  ADVENTURERS = "/adventurers",
  ADVENTURER = "/adventurers/:id",
  ITEMS = "/items",
  ITEM = "/items/:id",
  QUESTS = "/quests",
  QUEST = "/quests/:id",
}
export default Routes;

export interface MenuItem {
  label: string;
  to: Routes;
}
