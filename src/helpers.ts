import { InventoryItem, Size, PlacementResult } from "./types.ts";

export const placeItemsInInventory = (inventorySize: Size, items: InventoryItem[]): PlacementResult => {
  const [cols, rows] = inventorySize;
  const placedItems: InventoryItem[] = [];
  const unplacedItems: InventoryItem[] = [];
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (const item of items) {
    const [width, height] = item.size;
    let placed = false;

    // Перебираем все возможные позиции в сетке
    for (let y = 0; y <= rows - height; y++) {
      for (let x = 0; x <= cols - width; x++) {
        let fits = true;

        // Проверяем, помещается ли предмет в текущую позицию
        for (let i = y; i < y + height; i++) {
          for (let j = x; j < x + width; j++) {
            if (grid[i][j] !== 0) {
              fits = false;
              break;
            }
          }

          if (!fits) break;
        }

        // Если предмет помещается, помечаем клетки в сетке
        if (fits) {
          placed = true;
          placedItems.push({ ...item, position: [x, y] });

          for (let i = y; i < y + height; i++) {
            for (let j = x; j < x + width; j++) grid[i][j] = 1;
          }

          break;
        }
      }

      if (placed) break;
    }

    if (!placed) unplacedItems.push(item);
  }

  return { placedItems, unplacedItems };
};
