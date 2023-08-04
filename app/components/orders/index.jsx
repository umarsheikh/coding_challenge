import { useEffect, useState, useMemo } from "react";
import Table from "./table";

const fetchOrders = async () => {
  const response = await fetch("/api/orders.json");
  const data = await response.json();
  return data;
};

export default () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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


  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedOrders = useMemo(() => {
    if (sortColumn) {
      return [...orders].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return b[sortColumn] > a[sortColumn] ? 1 : -1;
        }
      });
    }
    return orders;
  }, [orders, sortColumn, sortOrder]);

  return(
    <div>
      {loading ? (
        <div className="loading-indication-text">Loading...</div>
      ) : (
        <Table orders={sortedOrders} onSort={handleSort} />
      )}
    </div>
  )

};
