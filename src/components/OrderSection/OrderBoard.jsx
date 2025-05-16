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
    id: 1000,
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
  const handleOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
<<<<<<< HEAD
    setAllOrders([newOrder, ...orders]);
=======
>>>>>>> 7987d933fce6fe416f11b9bfb8ed98c4acad60ca
    setName("");
    setTotalMoney(0);
    setCount(0);
    const newArr = items.map((item) => ({
      ...item,
      isAdd: true,
    }));
    setItems(newArr);
    if (orders.length === 0) {
      setTotalOrderCount(0);
      setPendingCount(0);
    }
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
    const changeOrder = orders.map((order) => {
      if (order.id === deliverOrder.id) {
        setDeliverCount((v) => v + 1);
        setPendingCount((v) => v - 1);
        return { ...order, status: "DELIVERED" };
      }
      return order;
    });
<<<<<<< HEAD
    setAllOrders(changeOrder);
    setOrders(changeOrder);
  };
  const handleDelete = (orderId) => {
    const deletedOrder = allorders.find((order) => order.id === orderId);
    const filteredOrders = allorders.filter((order) => order.id !== orderId);

    setAllOrders(filteredOrders);
    setOrders(filteredOrders);

    setTotalOrderCount((prev) => prev - 1);
    if (deletedOrder?.status === "PENDING") {
      setPendingCount((prev) => prev - 1);
=======
    setOrders(changeOrder);
  };
  const handleDelete = (orderId) => {
    const value = orders.find((order) => order.id === orderId);
    const filterOrder = orders.filter((order) => order.id != orderId);
    setOrders(filterOrder);
    setTotalOrderCount((value) => value - 1);
    if (totalOrderCount === pendingCount || value?.status === "PENDING") {
      setPendingCount((value) => value - 1);
>>>>>>> 7987d933fce6fe416f11b9bfb8ed98c4acad60ca
    } else {
      setDeliverCount((prev) => prev - 1);
    }
  };

  const handleFilterOrder = (text) => {
    if (text === "All") {
      setOrders(orders);
    } else {
      const filtered = orders
        .filter((order) => order.status.toLowerCase() === text.toLowerCase())
        .map((value) => {
          return value;
        });
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
