import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Container, Row } from "react-bootstrap";
import type { Order } from "../types/Order";

const Orders = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);

  const isLogged = () => localStorage.getItem("credentials") !== null;

  useEffect(() => {
    if (!isLogged()) return;

    apiClient
      .get("/rendelesek")
      .then((response) => setOrders(response.data))
      .catch(() => toast.error("A megrendelések betöltése sikertelen volt"));
  }, []);

  return isLogged() ? (
    <Container>
      <Row xs={"auto"} md={"auto"} className="g-4">
        {orders.map((i) => (
          <h1>
            {i.pizzaId} - {i.mennyiseg}
          </h1>
        ))}
      </Row>
    </Container>
  ) : (
    <h1>Kérlek jelentkezz be a megrendelések megtekintéséhez!</h1>
  );
};

export default Orders;
