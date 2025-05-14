import { useState } from "react";
import ChikenNuggets from "../../assets/chicken.svg";
import HamBurger from "../../assets/hamburger.svg";
import Pizza from "../../assets/pizza.svg";
import Sandwich from "../../assets/submarine.svg";
import CreateOrder from "./CreateOrder";
import OrderReports from "./OrderReports";
import OrderSummary from "./OrderSummary";
const itemsList = [
  {
    id: crypto.randomUUID(),
    name: "HamBurger",
    money: 300,
    icon: HamBurger,
    isAdd: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Chicken Nuggets",
    money: 250,
    icon: ChikenNuggets,
    isAdd: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Submarine Sandwich",
    money: 300,
    icon: Sandwich,
    isAdd: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Pizza Slice",
    money: 450,
    icon: Pizza,
    isAdd: true,
  },
];
const initialOrder = [
  {
    id: 1,
    customerName: "Sumit Saha",
    itemsOrder: 3,
    amount: 2330,
    status: "PENDING",
  },
];
export default function OrderBoard() {
  const [items, setItems] = useState(itemsList);
  const [orders, setOrders] = useState(initialOrder);

  const handleOrder = (newOrder) => {
    setOrders([...initialOrder, newOrder]);
  };

  const handleToggle = (toggleItem) => {
    const itemIndex = items.findIndex((item) => {
      return item.id === toggleItem.id;
    });
    const newItems = [...items];
    newItems[itemIndex].isAdd = !newItems[itemIndex].isAdd;
    setItems(newItems);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
      <CreateOrder
        onToggle={handleToggle}
        onOrder={handleOrder}
        items={items}
      />
      <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
        <OrderSummary />
        <OrderReports orders={orders} />
      </div>
    </div>
  );
}
