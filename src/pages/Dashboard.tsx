import AvailableAdventurersCount from "../components/Home/AvailableAdventurersCount";
import LastFiveTransaction from "../components/Home/LastFiveTransaction";
import PendingQuestsCount from "../components/Home/PendingQuestsCount";
import RequestsAvailable from "../components/Home/RequestsAvailableCount";
import TransactionHistory from "../components/Home/TransactionHistory";

const Dashboard = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <TransactionHistory />
          <LastFiveTransaction />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <RequestsAvailable />
          <PendingQuestsCount />
          <AvailableAdventurersCount />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
