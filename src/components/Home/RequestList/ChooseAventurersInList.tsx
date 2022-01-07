import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { Button, CheckboxGroup } from "react-rainbow-components";
import { useHistory } from "react-router-dom";
import request from "../../../axios";
import Routes from "../../../sdk/routes";
import { Adventurer, AdventurerProfile } from "../../../types/adventurers";

interface RequestFormType {
  groups: string[];
  request: string;
}

interface ChooseAventurersInListProps {
  requiredProfiles: AdventurerProfile[];
  dataAdventurers: Adventurer[];
  requestId: string;
}

const ChooseAventurersInList: FC<ChooseAventurersInListProps> = ({
  requiredProfiles,
  dataAdventurers,
  requestId,
}) => {
  const history = useHistory();

  const { mutateAsync } = useMutation<AxiosResponse, Error, RequestFormType>(
    (params) => request.post("quests", params)
  );

  const getFiltredAdventurers = () => {
    const tabAdventurers = requiredProfiles.map((reqProfile) => {
      return dataAdventurers.filter((ad: Adventurer) => {
        return (
          ad.experience >= reqProfile.experience &&
          ad.speciality.name === reqProfile.speciality.name &&
          ad.isAvailableNow
        );
      });
    });
    return tabAdventurers.flat();
  };

  const renderOptions = () => {
    if (!getFiltredAdventurers()) {
      return [];
    }
    return getFiltredAdventurers().map((adv: Adventurer) => {
      return { value: adv._id, label: adv.name, disabled: false };
    });
  };

  const [values, setValues] = useState<any>([]);

  return (
    <>
      {getFiltredAdventurers() && getFiltredAdventurers().length > 0 ? (
        <>
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
              onClick={async () => {
                await mutateAsync({ groups: values, request: requestId });
                history.push(Routes.QUESTS);
              }}
              style={{ marginTop: 20 }}
            >
              Affecter ces aventuriers
            </Button>
          </div>
        </>
      ) : (
        <p>Aucun aventuriers disponibles ne correspond à ces critères</p>
      )}
    </>
  );
};

export default ChooseAventurersInList;
