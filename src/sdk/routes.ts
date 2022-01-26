enum Routes {
  HOME = "/dashboard",
  REQUESTS = "/requests",
  LOGIN = "/login",
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
