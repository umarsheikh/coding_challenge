import { useEffect, useState } from "react";
import Table from "./table";

const fetchOrders = async () => {
  const response = await fetch("/api/orders.json");
  const data = await response.json();
  return data;
};

export default () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const go = async () => {
      try {
        const orders = await fetchOrders();
        setOrders(orders);
        setLoading(false);
      } catch (er) {
        alert(`uh oh! ${er}`);
      }
    };
    go();
  }, []);

  return(
    <div>
      {loading ? (
        <div className="loading-indication-text">Loading...</div>
      ) : (
        <Table orders={orders} />
      )}
    </div>
  )

};
