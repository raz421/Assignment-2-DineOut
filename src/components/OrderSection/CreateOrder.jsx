function generateOrderId() {
  const lastId = parseInt(localStorage.getItem("nextOrderId") || "1000", 10);
  const newId = lastId + 1;
  localStorage.setItem("nextOrderId", newId.toString());
  return newId;
}
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CreateOrder({
  items,
  onToggle,
  onOrder,
  name,
  totalMoney,
  onTextChange,
  onPlus,
  onMinus,
  count,
}) {
  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          value={name}
          onChange={onTextChange}
          type="text"
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-12 h-12   flex items-center justify-center mr-3">
                  <img src={item.icon} alt={item.name} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-400">BDT {item.money}</p>
                </div>
              </div>
              <button className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                {item.isAdd ? (
                  <FaPlus
                    color="green"
                    onClick={() => {
                      onPlus(item.money);
                      onToggle(item);
                    }}
                  />
                ) : (
                  <FaMinus
                    color="red"
                    onClick={() => {
                      onMinus(item.money);
                      onToggle(item);
                    }}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          onOrder({
            id: generateOrderId(),
            customerName: name,
            itemsOrder: count,
            amount: totalMoney,
            status: "PENDING",
          });
        }}
        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      >
        Place Order (BDT {totalMoney})
      </button>
    </div>
  );
}
