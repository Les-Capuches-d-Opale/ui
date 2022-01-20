import { Button, Modal } from "react-rainbow-components";

interface ValidationModaleProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  content?: string;
  onValidate: any;
}

const ValidationModale = ({
  isOpen,
  setOpen,
  title,
  content,
  onValidate,
}: ValidationModaleProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      title={title}
      footer={
        <div className="rainbow-flex rainbow-justify_end">
          <Button
            className="rainbow-m-right_large"
            label="Annuler"
            variant="neutral"
            onClick={() => setOpen(false)}
          />
          <Button
            label="Valider"
            variant="brand"
            onClick={() => {
              onValidate();
              setOpen(false);
            }}
          />
        </div>
      }
    >
      {content && <p style={{ textAlign: "center" }}>{content}</p>}
    </Modal>
  );
};

export default ValidationModale;
