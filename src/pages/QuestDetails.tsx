import { useQuery } from "react-query";
import { Avatar, Button, Column, Table } from "react-rainbow-components";
import { useParams } from "react-router-dom";
import request from "../axios";

//Styles
const avatarLarge = {
  width: 150,
  height: 150,
};
const headerStyles = {
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "50px",
};
const headerRightStyles: React.CSSProperties = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "30px",
  maxWidth: "100%",
};
const headerTitle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const questDescriptionStyles = {
  height: "70px",
};
const principalInfos: React.CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  marginBottom: "50px",
};
const info = {
  fontSize: "18px",
};
const titleAssign = {
  display: "flex",
  flex: 1,
  alignItems: "center",
};
const buttonAssign = {
  height: "30px",
  fontSize: "12px",
  margin: 0,
  marginLeft: "30px",
};

//Function
const durationConvert = (s: number) => {
  const h = Math.round((s / 3600) % 24);
  const jrs = Math.round(s / 3600 / 24);
  return `${jrs}j${h}h`;
};

const QuestDetails = () => {
  const isRequest = window.location.pathname.includes("/requests/")
    ? true
    : false;
  interface RouteParams {
    id: string;
  }
  const { id } = useParams<RouteParams>();
  const { data: quest } = useQuery("fetchRequest", () =>
    request.get(`https://les-capuches-d-opale.herokuapp.com/quests/${id}`)
  );

  const AvatarTable = ({ value }: any) => <Avatar src={value} />;

  return (
    <div style={{ padding: "30px 50px" }}>
      <div style={headerStyles}>
        <Avatar style={avatarLarge} src="https://picsum.photos/150/150" />
        <div style={headerRightStyles}>
          <div style={headerTitle}>
            <h1>{quest?.data.request.name}</h1>
            <div className={"status " + quest?.data.request.status}>
              {quest?.data.request.status}
            </div>
          </div>
          <p style={questDescriptionStyles}>
            {quest?.data.request.description}
          </p>
          <p style={{ fontSize: "10px", color: "grey" }}>
            Demande effectué par{" "}
            <strong style={{ color: "white" }}>
              {quest?.data.request.questGiver}
            </strong>
          </p>
        </div>
      </div>
      <div style={principalInfos}>
        <p style={info}>
          <strong>Prime: </strong>
          {quest?.data.request.bounty}
        </p>
        <p style={info}>
          <strong>EXP: </strong>
          {quest?.data.request.awardedExperience}
        </p>
        <p style={info}>
          <strong>Durée: </strong>
          {durationConvert(quest?.data.request.duration)}
        </p>
      </div>
      <div style={{ marginBottom: "50px" }}>
        <div style={titleAssign}>
          <h3 style={{ fontSize: "24px" }}>Aventurier Assignés</h3>
          {isRequest && (
            <Button
              style={buttonAssign}
              label="Assigner"
              variant="border"
              className="rainbow-m-around_medium"
            />
          )}
        </div>
        <Table data={quest?.data.groups} keyField="id">
          <Column header="Avatar" field="pictureUrl" component={AvatarTable} />
          <Column header="Name" field="name" />
          <Column header="Expérience" field="experience" />
          <Column header="Spécialité" field="speciality" />
        </Table>
        <p>
          <strong>Coût max. de la missions: </strong> 2500
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isRequest && (
          <Button
            label="Rejeter la mission"
            variant="destructive"
            className="rainbow-m-around_medium"
          />
        )}
        {isRequest && (
          <Button
            label="Valider l'équipe"
            variant="success"
            className="rainbow-m-around_medium"
          />
        )}
        {!isRequest && (
          <Button
            label="Lancer la mission"
            variant="success"
            className="rainbow-m-around_medium"
          />
        )}
      </div>
    </div>
  );
};

export default QuestDetails;
