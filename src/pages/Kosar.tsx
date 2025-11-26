import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

const Kosar = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
  );

  useEffect(() => {
    apiClient
      .get(`/pizzak`)
      .then((response) => setPizzak(response.data))
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, []);

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, [kosar]);

  const removeItem = (index: number) => {
    setKosar(kosar.filter((v, i) => i !== index));
  };

  return (
    <Table>
      <thead>
        <th>Név</th>
        <th>Ár</th>
      </thead>
      <tbody>
        {kosar.map((id, index) => {
          const pizza = pizzak.find((p) => p.id === id);
          return (
            <tr>
              <td>{pizza?.nev}</td>
              <td>{pizza?.ar}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(index)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <th></th>
        <th>{}</th>
      </tfoot>
    </Table>
  );
};

export default Kosar;
