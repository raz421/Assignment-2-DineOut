import Header from "./components/Header";
import OrderBoard from "./components/OrderSection/OrderBoard";

function App() {
  return (
    <div className="text-white bg-background">
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Header />
        <OrderBoard />
      </div>
    </div>
  );
}

export default App;
