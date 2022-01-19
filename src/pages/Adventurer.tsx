import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { ButtonIcon, Spinner } from "react-rainbow-components";
import request from "../axios";
import ModalAdventurerForm from "../components/AdventurerForm";
import AdventurersList from "../components/AdventurersList";
import Container from "../components/Container";

const Adventurer = () => {
  const { isLoading, data: dataAdventurers } = useQuery(
    "fetchAdventurers",
    () => request.get("/adventurers")
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Liste des aventuriers</h1>
            <span>
              <ButtonIcon
                variant="neutral"
                tooltip="Créer une requête"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => handleOnClick()}
              />
              <ModalAdventurerForm isOpen={isOpen} setOpen={setIsOpen} />
            </span>
          </div>
          <AdventurersList adventurers={dataAdventurers?.data} />
        </>
      )}
    </Container>
  );
};

export default Adventurer;
