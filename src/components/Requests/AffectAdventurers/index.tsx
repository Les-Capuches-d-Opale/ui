import { FC } from "react";
import { useQuery } from "react-query";
import { Modal, Spinner } from "react-rainbow-components";
import request from "../../../axios";
import { AdventurersAffectedProvider } from "../../../contexts/adventurersAffected";
import { AdventurerProfile } from "../../../sdk/adventurers";
import Container from "../../Core/Container";
import HeaderModal from "./HeaderModal";
import Steps from "./Steps";

type ModalAffectAdventersType = {
  isOpen: boolean;
  setOpen: Function;
  requestId: string;
  requiredProfiles: AdventurerProfile[];
  nameRequest: string;
  dateFin: string;
  dateDebut: string;
};

const ModalAffectAdventers: FC<ModalAffectAdventersType> = ({
  isOpen,
  setOpen,
  requestId,
  requiredProfiles,
  nameRequest,
  dateFin,
  dateDebut,
}) => {
  const { isLoading, data: dataAdventurers } = useQuery(
    "fetchAdventurers",
    () => request.get("/adventurers")
  );

  return (
    <AdventurersAffectedProvider>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        size="large"
        style={{ width: "90%", height: "100%" }}
      >
        <Container>
          {isLoading ? (
            <Spinner className="loader-cy" />
          ) : (
            <>
              <HeaderModal
                requiredProfiles={requiredProfiles}
                nameRequest={nameRequest}
                dateFin={dateFin}
                dateDebut={dateDebut}
              />

              <Steps
                requiredProfiles={requiredProfiles}
                adventurers={dataAdventurers?.data}
                requestId={requestId}
              />
            </>
          )}
        </Container>
      </Modal>
    </AdventurersAffectedProvider>
  );
};

export default ModalAffectAdventers;
