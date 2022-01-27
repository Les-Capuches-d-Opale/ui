import { useEffect, useState } from "react";
import { CheckboxToggle, Input } from "react-rainbow-components";
import { QueryParams } from "./RequestList";

interface FilterProps {
  setFiltered: (value: QueryParams) => void;
}

const Filter = ({ setFiltered }: FilterProps) => {
  const [bountyMin, setBountyMin] = useState<number>();
  const [bountyMax, setBountyMax] = useState<number>();
  const [experience, setExperience] = useState<number>();
  const [name, setName] = useState<string>();
  const [rejected, setRejected] = useState<boolean>(false);
  const [asap, setAsap] = useState<boolean>(false);
  const [questGiver, setQuestGiver] = useState<string>();

  useEffect(() => {
    setFiltered({
      name: name,
      bountyMin: bountyMin,
      bountyMax: bountyMax,
      awardedExperience: experience,
      rejected: rejected,
      asap: asap,
      questGiver: questGiver,
    });
  }, [name, bountyMin, bountyMax, experience, rejected, asap, questGiver]);

  return (
    <>
      <div className="adventurers-filter">
        <Input
          id="input-component-1"
          placeholder="Saisissez un nom de requète"
          label="Nom"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
          }}
        />
        <Input
          type="number"
          id="input-component-1"
          label="Expérience"
          placeholder="Expérience"
          onChange={(e) => {
            setExperience(Number(e.target.value));
          }}
        />
        <Input
          id="input-component-1"
          placeholder="Porteur de quête"
          label="Porteur de quête"
          value={questGiver}
          onChange={(e) => {
            setQuestGiver(e.target.value);
          }}
        />
      </div>

      <CheckboxToggle
        style={{ marginBottom: 20, marginRight: 20 }}
        id="checkbox-toggle-component-1"
        label="Uniqument les requètes non rejetées"
        value={rejected}
        onChange={() => setRejected(!rejected)}
      />
      <CheckboxToggle
        id="checkbox-toggle-component-1"
        label={
          <p>
            <strong style={{ color: "rgb(254, 72, 73)" }}>
              Requètes urgentes{" "}
            </strong>
            (expire dans moins de 5 jours)
          </p>
        }
        value={asap}
        onChange={() => setAsap(!asap)}
      />
    </>
  );
};

export default Filter;
