import { FC, useState } from "react";
import { useQuery } from "react-query";
import {
  Badge,
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

  const renderOptions = () => {
    return dataAdventurers?.data.map((adv: Adventurer) => {
      return { value: adv._id, label: adv.name, disabled: false };
    });
  };

  const [values, setValues] = useState<any>([]);

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
              label={`${profile.speciality.name} avec au moins ${profile.experience}XP`}
              variant="outline-brand"
            />
          );
        })}
      <CheckboxGroup
        label="Voici les aventuriers qui sont disponibles et qui correspondent aux critères demandés"
        options={renderOptions()}
        value={values}
        onChange={(values) => setValues(values)}
      />
    </Modal>
  );
};

export default ModalAffectAdventers;
