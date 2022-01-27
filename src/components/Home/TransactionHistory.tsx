import { useState } from "react";
import { useQuery } from "react-query";
import { Card, Chart, Dataset } from "react-rainbow-components";
import request from "../../axios";
import { Transaction, TransactionType } from "../../sdk/transaction";
import { format, sub } from "date-fns";

const containerStyles = {
  margin: "auto",
};

const cardStyles = {
  height: 410,
  width: 750,
  paddingRight: "24px",
  paddingLeft: "24px",
};

const TransactionHistory = () => {
  const [numberOfDays, setNumberOfDays] = useState(7);

  const { data: dataTransactions } = useQuery("fetchTransactions", () =>
    request.get("/transactions/groups?offset=" + numberOfDays)
  );
  const transactions = dataTransactions?.data;

  const formatDate = "yyyy-MM-dd";

  const labelsDate = [
    format(sub(new Date(), { days: 6 }), formatDate),
    format(sub(new Date(), { days: 5 }), formatDate),
    format(sub(new Date(), { days: 4 }), formatDate),
    format(sub(new Date(), { days: 3 }), formatDate),
    format(sub(new Date(), { days: 2 }), formatDate),
    format(sub(new Date(), { days: 1 }), formatDate),
    format(new Date(), formatDate),
  ];

  const transactionsAdventurerPayment: any[] = [];
  const transactionsQuestBounty: any[] = [];
  const transactionsPurchase: any[] = [];
  const transactionsTax: any[] = [];

  if (transactions) {
    transactions.sort((a: Transaction, b: Transaction) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA < dateB ? -1 : dateA === dateB ? 0 : 1;
    });

    transactions.forEach((transaction: Transaction) => {
      if (transaction.type === TransactionType.AdventurerPayment) {
        transactionsAdventurerPayment.push(transaction);
      }
      if (transaction.type === TransactionType.QuestBounty) {
        transactionsQuestBounty.push(transaction);
      }
      if (transaction.type === TransactionType.Purchase) {
        transactionsPurchase.push(transaction);
      }
      if (transaction.type === TransactionType.Tax) {
        transactionsTax.push(transaction);
      }
    });
  }

  return (
    <div style={containerStyles}>
      <Card title="Historique des transactions" style={cardStyles}>
        <div>
          <Chart labels={labelsDate} type="bar">
            <Dataset
              title="Récompenses de quêtes"
              values={transactionsQuestBounty.map(
                (transaction: Transaction) => transaction.amount
              )}
              backgroundColor="#1de9b6"
              borderColor="#1de9b6"
            />
            <Dataset
              title="Paiements aventuriers"
              values={transactionsAdventurerPayment.map(
                (transaction: Transaction) => transaction.amount
              )}
              backgroundColor="#01b6f5"
              borderColor="#01b6f5"
            />
            <Dataset
              title="Achats"
              values={transactionsPurchase.map(
                (transaction: Transaction) => transaction.amount
              )}
              backgroundColor="#fe4849"
              borderColor="#fe4849"
            />
            <Dataset
              title="Taxes"
              values={transactionsTax.map(
                (transaction: Transaction) => transaction.amount
              )}
              backgroundColor="#ffcc00"
              borderColor="#ffcc00"
            />
          </Chart>
        </div>
      </Card>
    </div>
  );
};

export default TransactionHistory;
