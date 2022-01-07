import { FC, useState } from "react";
import { useQuery } from "react-query";
import {
  Badge,
  Button,
  CheckboxGroup,
  Chip,
  Modal,
  Spinner,
} from "react-rainbow-components";
import request from "../axios";
import { Adventurer, AdventurerProfile } from "../types/adventurers";

type ModalAffectAdventersType = {
  isOpen: boolean;
  setOpen: Function;
  requestId: string;
  requiredProfiles: AdventurerProfile[];
};

const ModalAffectAdventers: FC<ModalAffectAdventersType> = ({
  isOpen,
  setOpen,
  requestId,
  requiredProfiles,
}) => {
  const {
    isLoading,
    error,
    data: dataAdventurers,
  } = useQuery("fetchAdventurers", () => request.get("/adventurers"));

  const getFiltredAdventurers = () => {
    return requiredProfiles.map((reqProfile) => {
      return dataAdventurers?.data.filter((ad: Adventurer) => {
        return (
          ad.experience >= reqProfile.experience &&
          ad.speciality.name === reqProfile.speciality.name
        );
      });
    });
  };

  const renderOptions = () => {
    return getFiltredAdventurers()
      .flat()
      .map((adv: Adventurer) => {
        return { value: adv._id, label: adv.name, disabled: false };
      });
  };

  const [values, setValues] = useState<any>([]);

  console.log(values);

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
      {isLoading && <Spinner />}
      <h1 style={{ textAlign: "center" }}>
        Choisissez les aventuriers à affecter à cette requète
      </h1>
      <p style={{ fontWeight: "bold" }}>Critères demandés</p>
      {requiredProfiles &&
        requiredProfiles.length > 0 &&
        requiredProfiles.map((profile, i) => {
          return (
            <Chip
              key={i}
              className="rainbow-m-around_medium"
              label={`${profile.speciality?.name} avec au moins ${profile.experience}XP`}
              variant="outline-brand"
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginRight: 10,
                marginLeft: 0,
              }}
            />
          );
        })}
      <CheckboxGroup
        label="Voici les aventuriers qui sont disponibles et qui correspondent aux critères demandés"
        options={renderOptions()}
        value={values}
        onChange={(values) => setValues(values)}
        style={{ marginTop: 20 }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="brand"
          onClick={() => console.log("hello")}
          style={{ marginTop: 20 }}
        >
          Affecter ces aventuriers
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAffectAdventers;
