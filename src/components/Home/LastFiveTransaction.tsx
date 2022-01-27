import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Card, Column, Table } from "react-rainbow-components";
import request from "../../axios";
import { Transaction } from "../../sdk/transaction";

const containerStyles = {
  margin: "auto",
};

const cardStyles = {
  height: 410,
  width: 750,
  paddingRight: "24px",
  paddingLeft: "24px",
  display: "flex",
  flexFlow: "column",
};

const LastFiveTransaction = () => {
  const { data: dataTransactions } = useQuery("fetchLastTransactions", () =>
    request.get("/transactions/last")
  );
  const lastTransactions = dataTransactions?.data.lastTransaction;

  const [dataTable, setDataTable] = useState<Transaction[]>(lastTransactions);

  useEffect(() => {
    setDataTable(lastTransactions);
  }, [lastTransactions]);

  return (
    <div style={containerStyles}>
      <Card title="Dernières transactions" style={cardStyles}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Table data={dataTable} keyField="id">
            <Column header="Type" field="type" />
            <Column header="Date" field="date" />
            <Column header="Valeur" field="amount" />
          </Table>
        </div>
        {/* <CenterBlock>
          <Link to={"/dashboard"}>
            <Button variant="brand" label="Voir les transactions" />
          </Link>
        </CenterBlock> */}
      </Card>
    </div>
  );
};

export default LastFiveTransaction;
