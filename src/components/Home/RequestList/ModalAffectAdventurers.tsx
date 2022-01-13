import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCalendarWeek, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useQuery } from "react-query";
import { Chip, Modal, Spinner } from "react-rainbow-components";
import request from "../../../axios";
import { AdventurerProfile } from "../../../sdk/adventurers";
import { secondsToDays } from "../../../utils/secondsToDays";
import Container from "../../Container";
import ChipList from "./ChipList";
import LabelAccordionRequest from "./LabelAccordionRequest";
import TablesTab from "./Tables/TablesTab";

type ModalAffectAdventersType = {
  isOpen: boolean;
  setOpen: Function;
  requestId: string;
  requiredProfiles: AdventurerProfile[];
  nameRequest: string;
  duration: number;
  dateDebut: Date;
};

const ModalAffectAdventers: FC<ModalAffectAdventersType> = ({
  isOpen,
  setOpen,
  requestId,
  requiredProfiles,
  nameRequest,
  duration,
  dateDebut,
  coucou,
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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>
              Choisissez les aventuriers à affecter à la requète
            </h1>

            <div>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {nameRequest}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <Chip
                  className="rainbow-m-around_medium"
                  label={
                    <>
                      <FontAwesomeIcon
                        icon={faClock}
                        className="rainbow-m-right_xx-small"
                      />
                      Durée: {secondsToDays(duration)}
                    </>
                  }
                />

                <Chip
                  className="rainbow-m-around_medium"
                  label={
                    <>
                      <FontAwesomeIcon
                        icon={faCalendarWeek}
                        className="rainbow-m-right_xx-small"
                      />
                      Date de début : {dateDebut}
                    </>
                  }
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 20,
                marginBottom: 50,
              }}
            >
              <p style={{ fontWeight: "bold" }}>Critères demandés</p>
              <ChipList requiredProfiles={requiredProfiles} />
            </div>
            <TablesTab
              requiredProfiles={requiredProfiles}
              adventurers={dataAdventurers?.data}
              requestId={requestId}
            />
          </>
        )}
      </Container>
    </Modal>
  );
};

export default ModalAffectAdventers;
