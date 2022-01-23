import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useState } from "react";
import { ButtonIcon } from "react-rainbow-components";
import ModalAdventurerForm from "../components/Adventurers/AdventurerForm";
import AdventurersList from "../components/Adventurers/AdventurersList";
import Container from "../components/Core/Container";

const titleLayout: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const AdventurerScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <div style={titleLayout}>
        <h1>Liste des aventuriers</h1>
        <span>
          <ButtonIcon
            variant="neutral"
            tooltip="Créer une requête"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => handleOnClick()}
            className="btn-add-adventurer-cy"
          />
          <ModalAdventurerForm isOpen={isOpen} setOpen={setIsOpen} />
        </span>
      </div>
      <AdventurersList />
    </Container>
  );
};

export default AdventurerScreen;
