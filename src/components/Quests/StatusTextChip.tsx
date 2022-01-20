interface Props {
  status: string;
}

const StatusTextChip = ({ status }: Props) => {
  return (
    <div style={{ cursor: "pointer" }}>
      <div className={"status " + status}>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default StatusTextChip;
