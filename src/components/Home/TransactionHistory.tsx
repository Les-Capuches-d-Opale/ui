import { useState } from "react";
import { useQuery } from "react-query";
import { Card, Chart, Dataset } from "react-rainbow-components";
import request from "../../axios";
import { Transaction, TransactionType } from "../../sdk/transaction";
import Container from "../Core/Container";
import { format, sub } from "date-fns";

const containerStyles = {
  margin: "auto",
};

const cardStyles = {
  paddingRight: "24px",
  paddingLeft: "24px",
};

const TransactionHistory = () => {
  const [numberOfDays, setNumberOfDays] = useState(7);

  const { data: dataTransactions } = useQuery("fetchTransactions", () =>
    request.get("/transactions/" + numberOfDays)
  );

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

  const transactions = dataTransactions?.data;
  //   const transactionsByType: any[string] = [];
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
        const sameTransaction = transactionsAdventurerPayment.some(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );
        const originTransaction = transactionsAdventurerPayment.find(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );

        if (sameTransaction === true) {
          originTransaction.amount += transaction.amount;
        } else if (sameTransaction === false) {
          transactionsAdventurerPayment.push(transaction);
        }
      }
      if (transaction.type === TransactionType.QuestBounty) {
        const sameTransaction = transactionsQuestBounty.some(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );
        const originTransaction = transactionsQuestBounty.find(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );

        if (sameTransaction === true) {
          originTransaction.amount += transaction.amount;
        } else if (sameTransaction === false) {
          transactionsQuestBounty.push(transaction);
        }
      }
      if (transaction.type === TransactionType.Purchase) {
        const sameTransaction = transactionsPurchase.some(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );
        const originTransaction = transactionsPurchase.find(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );

        if (sameTransaction === true) {
          originTransaction.amount += transaction.amount;
        } else if (sameTransaction === false) {
          transactionsPurchase.push(transaction);
        }
      }
      if (transaction.type === TransactionType.Tax) {
        const sameTransaction = transactionsTax.some(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );
        const originTransaction = transactionsTax.find(
          (element: Transaction) =>
            element.type === transaction.type &&
            format(new Date(element.date), formatDate) ===
              format(new Date(transaction.date), formatDate)
        );

        if (sameTransaction === true) {
          originTransaction.amount += transaction.amount;
        } else if (sameTransaction === false) {
          transactionsTax.push(transaction);
        }
      }
    });
  }

  return (
    <Container>
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
    </Container>
  );
};

export default TransactionHistory;
