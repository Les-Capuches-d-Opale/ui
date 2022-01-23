import { useState } from "react";
import { Input } from "react-rainbow-components";
import { QueryParams } from "./RequestList";

interface FilterProps {
  filtered: QueryParams;
  setFiltered: (value: QueryParams) => void;
}

const Filter = ({ setFiltered, filtered }: FilterProps) => {
  const [bountyMin, setBountyMin] = useState<number>(1);
  const [bountyMax, setBountyMax] = useState<number>(1200000);
  const [xp, setXp] = useState<string>();
  const [questGiver, setQuestGiver] = useState<string>();
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<string>();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <Input
        id="input-component-1"
        placeholder="Saisissez un nom de requète"
        label="Nom"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setFiltered({ ...filtered, name: e.target.value });
        }}
      />
      <Input
        id="input-component-1"
        type="number"
        label="Prime minimum"
        placeholder="Prime minimum"
        value={bountyMin}
        onChange={(e) => {
          setBountyMin(Number(e.target.value));
          setFiltered({ ...filtered, bountyMin: Number(e.target.value) });
        }}
      />
      <Input
        type="number"
        id="input-component-1"
        label="Prime maximum"
        placeholder="Prime maximum"
        value={bountyMax}
        onChange={(e) => {
          setBountyMax(Number(e.target.value));
          setFiltered({ ...filtered, bountyMax: Number(e.target.value) });
        }}
      />
      {/* <Input
        type="number"
        id="input-component-1"
        placeholder="Exp"
        onChange={(e) => {
          setName(e.target.value);
          setFiltered({ ...filtered, experience: e.target.value });
        }}
      /> */}
      {/* <Input
        id="input-component-1"
        placeholder="Commanditaire"
        onChange={(e) =>
          setQuestGiver(e.target.value === "" ? undefined : e.target.value)
        }
      />
      <Input
        type="number"
        id="input-component-1"
        placeholder="Durée"
        onChange={(e) =>
          setDuration(e.target.value === "" ? undefined : e.target.value)
        }
      /> */}
    </div>
  );
};

export default Filter;
