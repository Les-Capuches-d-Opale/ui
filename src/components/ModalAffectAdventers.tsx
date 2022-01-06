import { FC } from "react";
import { Modal } from "react-rainbow-components";

type ModalAffectAdventersType = {
  isOpen: boolean;
  setOpen: Function;
};

const ModalAffectAdventers: FC<ModalAffectAdventersType> = ({
  isOpen,
  setOpen,
}) => {
  return (
    <Modal id="modal-1" isOpen={isOpen} onRequestClose={() => setOpen(false)}>
      <img
        src="images/illustrations/Illustration-rainbow-1.svg"
        className="rainbow-p-around_xx-large rainbow-m_auto rainbow-align-content_center"
        alt="landscape with rainbows, birds and colorful balloons"
      />
    </Modal>
  );
};

export default ModalAffectAdventers;
