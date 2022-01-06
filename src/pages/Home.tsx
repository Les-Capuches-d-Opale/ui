import RequestList from "../components/RequestList";

const Home = () => {
  const requests = [
    {
      profilPicture: "https://picsum.photos/200/300",
      name: "Ma requète trop cool",
      questGiver: "Tartin",
      bounty: 20.3,
      duration: 5,
      startDate: new Date(),
    },
    {
      profilPicture: "https://picsum.photos/200/300",
      name: "Ma requète trop cool 2",
      questGiver: "Tartin",
      bounty: 20.3,
      duration: 5,
      startDate: new Date(),
    },
  ];

  return (
    <div>
      <RequestList requests={requests} />
    </div>
  );
};

export default Home;
