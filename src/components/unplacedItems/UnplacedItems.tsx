import { InventoryItems, InventoryData } from "../../types";
import "./UnplacedItems.css";

const UnplacedItems = (props: InventoryData) => {
  const items: InventoryItems = props.items;

  const buildUnplacedItems = () => items.map((item, index) => (
      <li key={index} className={`unplaced__item ${item.rarity}`}>
        <span className="unplaced__item-text">
          Item {item.id} ({item.type}, {item.size[0]}x{item.size[1]})
        </span>
      </li>
  ));

  return (
    <div className="unplaced">
      <h2 className="unplaced__title">Items that didn't fit:</h2>
      <ul className="unplaced__list">
        {buildUnplacedItems()}
      </ul>
    </div>
  );
};

export default UnplacedItems;
