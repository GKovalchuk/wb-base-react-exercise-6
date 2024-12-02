import React, { useEffect, useState } from "react";
import Inventory from "./components/inventory/Inventory.tsx";
import UnplacedItems from "./components/unplacedItems/UnplacedItems.tsx";
import { placeItemsInInventory } from "./helpers.ts";
import { InventoryData, InventoryItems, Size } from "./types.ts";
import "./App.css";

const INVENTORY_SIZE: Size = [10, 10];

const App: React.FC = () => {
  const inventorySize = INVENTORY_SIZE;
  const [placedItems, setPlacedItems] = useState<InventoryItems>([]);
  const [unplacedItems, setUnplacedItems] = useState<InventoryItems>([]);

  useEffect(() => {
    /*
    * data.json - все предметы помещаются в инвентарь
    * data2.json - предметы не помещаются
    * data3.json - предметы не помещаются
    */
    fetch("/data2.json")
      .then((response) => response.json())
      .then((data: InventoryData) => {
        const { placedItems, unplacedItems } = placeItemsInInventory(inventorySize, data.items);

        setPlacedItems(placedItems);
        setUnplacedItems(unplacedItems);
      })
      .catch((error) => console.error("Error loading inventory:", error));
  }, [inventorySize]);

  return (
    <div className="app">
      <h1 className="app__title">Inventory</h1>
      <div className="app__content">
        <Inventory inventorySize={inventorySize} items={placedItems} />
        {unplacedItems.length > 0 && <UnplacedItems items={unplacedItems} />}
      </div>
    </div>
  );
};

export default App;
