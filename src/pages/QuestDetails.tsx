import { faChevronLeft, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { Avatar, Button, ButtonIcon, Column, Table } from "react-rainbow-components";
import { useHistory, useParams } from "react-router-dom";
import request from "../axios";
import Container from "../components/Container";
import { Quests } from "../sdk/quest";
import { secondsToDays } from "../utils/secondsToDays";

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
  marginBottom: "20px",
};

const principalInfos: React.CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  marginBottom: "30px",
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

interface RouteParams {
  id: string;
}

const AvatarTable = ({ value }: any) => <Avatar src={value} />;

const QuestDetails = () => {
  const isRequest = window.location.pathname.includes("/requests/") ? true : false;

  const history = useHistory();

  const { id } = useParams<RouteParams>();

  const { data: quest } = useQuery("fetchQuest", () =>
    request.get<Quests>(`https://les-capuches-d-opale.herokuapp.com/quests/${id}`)
  );

  return (
    <Container>
      <ButtonIcon
        style={{ margin: "15px 0 15px -80px" }}
        variant="neutral"
        tooltip="Revenir en arrière"
        icon={<FontAwesomeIcon icon={faChevronLeft} />}
        onClick={() => history.goBack()}
      />
      <div style={headerStyles}>
        <Avatar style={avatarLarge} src="https://picsum.photos/150/150" />
        <div style={headerRightStyles}>
          <div style={headerTitle}>
            <h1>{quest?.data.request.name}</h1>
            <div className={"status " + quest?.data.request.status}>
              {quest?.data.request.status}
            </div>
          </div>
          <p style={questDescriptionStyles}>{quest?.data.request.description}</p>
          <p style={{ fontSize: "10px", color: "grey" }}>
            Demande effectuée par{" "}
            <strong style={{ color: "white" }}>{quest?.data.request.questGiver}</strong>
          </p>
        </div>
      </div>
      <div style={principalInfos}>
        <p style={info}>
          <strong>Prime: </strong>
          {quest?.data.request.bounty} <FontAwesomeIcon icon={faCoins} />
        </p>
        <p style={info}>
          <strong>EXP : </strong>
          {quest?.data.request.awardedExperience}
        </p>
        <p style={info}>
          <strong>Durée: </strong>
          {secondsToDays(quest?.data.request.duration)}
        </p>
      </div>
      <div style={{ marginBottom: "50px" }}>
        <div style={titleAssign}>
          <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Aventurier Assignés</h3>
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
        <p style={{marginTop: '15px'}}>
          {/* TODO: Add calculated amount */}
          <strong>Coût max. de la mission: </strong> 2500 <FontAwesomeIcon icon={faCoins} />
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
          <Button label="Valider l'équipe" variant="success" />
        )}
        {!isRequest && (
          <Button label="Lancer la mission" variant="success" />
        )}
      </div>
    </Container>
  );
};

export default QuestDetails;
