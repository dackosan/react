import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

const Kosar = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
  );
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    apiClient
      .get(`/pizzak`)
      .then((response) => setPizzak(response.data))
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, []);

  return (
    <Table>
      <thead>
        <th>Név</th>
        <th>Ár</th>
      </thead>
      <tbody>
        {kosar.map((id) => {
          const pizza = pizzak.find((p) => p.id === id);

          if (pizza?.ar) {
            setSum(sum + Number(pizza?.ar));
          }

          return (
            <tr>
              <td>{pizza?.nev}</td>
              <td>{pizza?.ar}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <th></th>
        <th>{sum}</th>
      </tfoot>
    </Table>
  );
};

export default Kosar;
