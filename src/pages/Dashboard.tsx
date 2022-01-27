import AvailableAdventurersCount from "../components/Home/AvailableAdventurersCount";
import LastFiveTransaction from "../components/Home/LastFiveTransaction";
import PendingQuestsCount from "../components/Home/PendingQuestsCount";
import RequestsAvailable from "../components/Home/RequestsAvailableCount";
import TransactionHistory from "../components/Home/TransactionHistory";

const Dashboard = () => {
  return (
    <>
      <div className="dahsboard-container">
        <div className="dahsboard-part">
          <TransactionHistory />
          <LastFiveTransaction />
        </div>
        <div className="dahsboard-part">
          <RequestsAvailable />
          <PendingQuestsCount />
          <AvailableAdventurersCount />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
