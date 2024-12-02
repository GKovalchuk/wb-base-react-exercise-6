import { InventoryGridProps, InventoryItem } from "../../types";
import "./Inventory.css";

type FindItemParams = {
  x: number;
  y: number;
  items: InventoryItem[];
};

type InventoryCell = {
  x: number;
  y: number;
  item: InventoryItem | undefined;
  isFirst?: boolean;
};

const findItemAtPosition = ({ x, y, items }: FindItemParams) => items.find((item) => {
    const [itemX, itemY] = item.position!;
    const [itemWidth, itemHeight] = item.size;
    return x >= itemX && x < itemX + itemWidth && y >= itemY && y < itemY + itemHeight;
});

const isFirstCell = ({ x, y, item }: InventoryCell) => item?.position![0] === x && item?.position![1] === y;

const getItemCellStyle = ({ x, y, item, isFirst }: InventoryCell) => {
  if (!item || !isFirst) return {};
  
  return {
    gridColumn: `${x + 1} / span ${item.size[0]}`,
    gridRow: `${y + 1} / span ${item.size[1]}`,
  };
};

const getItemCellClassName = (item: InventoryItem | undefined, isFirst?: boolean) => {
  if (item || isFirst) return `inventory__cell--item ${item?.rarity}`;
};

const Inventory = ({ inventorySize, items }: InventoryGridProps) => {
  const [cols, rows] = inventorySize;

  const buildInventoryCells = () => {
    const cells: InventoryCell[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const item = findItemAtPosition({ x, y, items });
        const isFirstItemCell = isFirstCell({ x, y, item });

        if (item && !isFirstItemCell) continue;

        cells.push({ x, y, item, isFirst: isFirstItemCell });
      }
    }

    return cells.map((cell: InventoryCell, index: number) => (
      <div
        key={index}
        className={`inventory__cell ${getItemCellClassName(cell.item, cell.isFirst)}`}
        style={ getItemCellStyle({ x: cell.x, y: cell.y, item: cell.item, isFirst: cell.isFirst }) }
      >
        { cell.item && (<span className="inventory__cell-label">{cell.item.type}</span>) }
      </div>
    ));
  };

  const getGridStyle = () => ({
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  });

  return (
    <div className="inventory" style={getGridStyle()}>
      {buildInventoryCells()}
    </div>
  );
};

export default Inventory;
