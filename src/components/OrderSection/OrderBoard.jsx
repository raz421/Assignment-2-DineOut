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
  const [name, setName] = useState("");
  let [totalMoney, setTotalMoney] = useState(0);
  let [count, setCount] = useState(0);
  let [totalOrderCount, setTotalOrderCount] = useState(1);
  let [pendingCount, setPendingCount] = useState(1);
  let [deliverCount, setDeliverCount] = useState(0);
  const [allOrders, setAllOrders] = useState(initialOrder);
  const handleOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
    setAllOrders([...orders, newOrder]);

    setName("");
    setTotalMoney(0);
    setCount(0);
    const newArr = items.map((item) => ({
      ...item,
      isAdd: true,
    }));
    setItems(newArr);
    setTotalOrderCount((value) => value + 1);
    setPendingCount((value) => value + 1);
  };

  const handleToggle = (toggleItem) => {
    const itemIndex = items.findIndex((item) => {
      return item.id === toggleItem.id;
    });
    const newItems = [...items];
    newItems[itemIndex].isAdd = !newItems[itemIndex].isAdd;
    setItems(newItems);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handlePlus = (money) => {
    setTotalMoney((prev) => prev + money);
    setCount((prev) => prev + 1);
  };
  const handleMinus = (money) => {
    if (totalMoney > 0 && count > 0) {
      setTotalMoney((prev) => prev - money);
      setCount((prev) => prev - 1);
    }
    return totalMoney;
  };
  const handleDeliver = (deliverOrder) => {
    const updatedOrders = allOrders.map((order) => {
      if (order.id === deliverOrder.id) {
        setDeliverCount((v) => v + 1);
        setPendingCount((v) => v - 1);
        return { ...order, status: "DELIVERED" };
      }
      return order;
    });
    setOrders(updatedOrders);
    setAllOrders(updatedOrders);
  };
  const handleDelete = (orderId) => {
    const filterOrder = orders.filter((order) => order.id != orderId);
    setOrders(filterOrder);
    setAllOrders(filterOrder);
    setTotalOrderCount((value) => value - 1);
    // setPendingCount((value) => value - 1);
  };
  // const handleFilterOrder = (text) => {
  //   setOrders(
  //     orders.filter((order) => {
  //       if (text === "All") {
  //         return true;
  //       } else {
  //         return order.status.toLowerCase().includes(text.toLowerCase());
  //       }
  //     })
  //   );
  // };
  const handleFilterOrder = (text) => {
    if (text === "All") {
      setOrders(allOrders);
    } else {
      const filtered = allOrders.filter(
        (order) => order.status.toLowerCase() === text.toLowerCase()
      );
      setOrders(filtered);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
      <CreateOrder
        onToggle={handleToggle}
        onOrder={handleOrder}
        items={items}
        name={name}
        totalMoney={totalMoney}
        onTextChange={handleChange}
        onPlus={handlePlus}
        onMinus={handleMinus}
        count={count}
      />
      <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
        <OrderSummary
          totalOrderCount={totalOrderCount}
          pendingCount={pendingCount}
          deliverCount={deliverCount}
        />
        <OrderReports
          orders={orders}
          onDeliver={handleDeliver}
          onDelete={handleDelete}
          onFilter={handleFilterOrder}
        />
      </div>
    </div>
  );
}
