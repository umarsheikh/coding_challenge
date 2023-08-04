import { useState } from "react";

const OrderTable = ({ orders, onSort }) => (
  <table className="table orders-table">
    <thead>
      <tr>
        <th className="sortable" onClick={() => onSort("id")}>Order #</th>
        <th>Ordered at</th>
        <th className="sortable" onClick={() => onSort("pick_up_at")}>Pick up at</th>
        <th className="sortable" onClick={() => onSort("customer_name")}>Customer Name</th>
        <th>Item</th>
        <th>Qty</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </tbody>
  </table>
);

const OrderRow = ({ order }) => {
  const [isFulfilling, setIsFulfilling] = useState(false);
  const handleFulfillOrder = async () => {
      setIsFulfilling(true);
      try {
        await fetch(`/api/orders/${order.id}/fulfill.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fulfilled: true }),
        });
        order.fulfilled = true;
      } catch (error) {
        alert(`Uh oh! Failed to fulfill the order. ${error}`);
      } finally {
        setIsFulfilling(false);
      }
    };


  return (
    <tr>
      <td>{order.id}</td>
      <td>{formatDate(order.created_at)}</td>
      <td>{formatDate(order.pick_up_at)}</td>
      <td>{order.customer_name}</td>
      <td>{order.item}</td>
      <td>{order.quantity}</td>
      <td>{order.fulfilled ? `Fulfilled` : `In progress`}</td>
      <td>
        {!order.fulfilled && (
          <button
            disabled={isFulfilling}
            onClick={handleFulfillOrder}
            className="fulfill-button"
          >
            {isFulfilling ? "Fulfilling..." : "Fulfill order"}
          </button>
        )}
      </td>
    </tr>
  );
};



const formatDate = (dateString) => {
  let date = new Date(dateString);
  return date.toLocaleDateString();
};

export default OrderTable;
