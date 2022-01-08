import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Chip, Modal, Spinner } from "react-rainbow-components";
import { useHistory } from "react-router-dom";
import request from "../../../axios";
import { Adventurer, AdventurerProfile } from "../../../sdk/adventurers";
import Routes from "../../../sdk/routes";
import AdventurersList from "../../AdventurersList";
import Container from "../../Container";
import CriteresTable from "./Tables/CriteresTable";

type ModalAffectAdventersType = {
  isOpen: boolean;
  setOpen: Function;
  requestId: string;
  requiredProfiles: AdventurerProfile[];
};

interface RequestFormType {
  groups: string[];
  request: string;
}

const ModalAffectAdventers: FC<ModalAffectAdventersType> = ({
  isOpen,
  setOpen,
  requestId,
  requiredProfiles,
}) => {
  const { isLoading, data: dataAdventurers } = useQuery(
    "fetchAdventurers",
    () => request.get("/adventurers")
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      size="large"
      style={{ width: "90%", height: "100%" }}
    >
      <Container>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
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
            <CriteresTable
              adventurers={dataAdventurers?.data}
              requiredProfiles={requiredProfiles}
              requestId={requestId}
            />
          </>
        )}
      </Container>
    </Modal>
  );
};

export default ModalAffectAdventers;
