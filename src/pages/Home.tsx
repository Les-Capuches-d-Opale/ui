import { useState } from 'react';
import { useQuery } from "react-query";
import { Spinner, Input, DateTimePicker, Picklist, Option } from "react-rainbow-components";
import request from "../axios";
import RequestList from "../components/Home/RequestList/RequestList";

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  padding: '30px 0'
}
const inputStyles = {
  width: '150px',
  marginRight: '10px'
}

const Home = () => {
  const [bountyMin, setBountyMin] = useState<string>()
  const [bountyMax, setBountyMax] = useState<string>()
  const [xp, setXp] = useState<string>()
  const [questGiver, setQuestGiver] = useState<string>()
  const [name, setName] = useState<string>()
  const [duration, setDuration] = useState<string>()

  const { isLoading, data: dataRequest } = useQuery("fetchRequest", () =>
    request.get(
      "/requests",
      {
        params: {
          "bountyMin": bountyMin,
          "bountyMax": bountyMax,
          "awardedExperience": xp,
          "questGiver": questGiver,
          "name": name,
          "duration": duration
        },
      }
    )
  );

  return (
    <>
      {isLoading && <Spinner />}
      <div style={containerStyles}>
        <Input
            type='number'
            id="input-component-1"
            placeholder="Prime min"
            style={inputStyles}
            onChange={e => setBountyMin(e.target.value === '' ? undefined : e.target.value)}
        />
        <Input
            type='number'
            id="input-component-1"
            placeholder="Prime max"
            style={inputStyles}
            onChange={e => setBountyMax(e.target.value === '' ? undefined : e.target.value)}
        />
        <Input
            type='number'
            id="input-component-1"
            placeholder="Exp"
            style={inputStyles}
            onChange={e => setXp(e.target.value === '' ? undefined : e.target.value)}
        />
        <Input
            id="input-component-1"
            placeholder="Commanditaire"
            style={inputStyles}
            onChange={e => setQuestGiver(e.target.value === '' ? undefined : e.target.value)}
        />
        <Input
            type='number'
            id="input-component-1"
            placeholder="Durée"
            style={inputStyles}
            onChange={e => setDuration(e.target.value === '' ? undefined : e.target.value)}
        />
      </div>
      <RequestList requests={dataRequest?.data} />
    </>
  );
};

export default Home;
