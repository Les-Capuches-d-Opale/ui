import { Dispatch, SetStateAction } from "react";

interface Props {
    status: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const StatusTextChip = ({ setOpen, status }: Props) => {
  return (
    <div style={{cursor: 'pointer'}} onClick={() => setOpen(true)}>
      <div className={"status " + status} >
        <p>{status}</p>
      </div>
      <p style={{ fontStyle: "italic" }}>Changer le status de la quête</p>
    </div>
  );
};

export default StatusTextChip;
