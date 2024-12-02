export type Rarity = "common" | "rare" | "epic" | "legendary";

export type ItemType = string;
export type Size = [number, number];
export type Position = [number, number];

export type InventoryItem = {
  id: number;
  type: ItemType;
  rarity: Rarity;
  size: Size;
  position?: Position;
};
export type InventoryItems = InventoryItem[];
export type InventoryData = {
  items: InventoryItem[];
};

export type PlacementResult = {
  placedItems: InventoryItems;
  unplacedItems: InventoryItems;
};

export type InventoryGridProps = {
  inventorySize: Size;
  items: InventoryItem[];
};
