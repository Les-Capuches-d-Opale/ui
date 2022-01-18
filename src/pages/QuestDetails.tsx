import { faChevronLeft, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import {
  Avatar,
  Button,
  ButtonIcon,
  Column,
  Table,
} from "react-rainbow-components";
import { useHistory, useParams } from "react-router-dom";
import request from "../axios";
import Container from "../components/Core/Container";
import DetailsHeader from "../components/Quests/DetailsHeader";
import InfoHeader from "../components/Quests/InfoHeader";
import { Quests } from "../sdk/quest";

// Styles

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

const AvatarTable = ({ value }: { value: string }) => <Avatar src={value} />;

const QuestDetails = () => {
  const isRequest = !!window.location.pathname.includes("/requests/");

  const history = useHistory();

  const { id } = useParams<RouteParams>();

  const { data: quest } = useQuery("fetchQuest", () =>
    request.get<Quests>(`/quests/${id}`)
  );

  return (
    <Container>
      {quest && (
        <>
          <ButtonIcon
            style={{ margin: "15px 0 15px -80px" }}
            variant="neutral"
            tooltip="Revenir en arrière"
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
            onClick={() => history.goBack()}
          />
          <DetailsHeader requestDetails={quest.data.request} />
          <InfoHeader requestInfo={quest.data.request} />
          <div style={{ marginBottom: "50px" }}>
            <div style={titleAssign}>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>
                Aventurier Assignés
              </h3>
              {isRequest && (
                <Button
                  style={buttonAssign}
                  label="Assigner"
                  variant="border"
                  className="rainbow-m-around_medium"
                />
              )}
            </div>
            <Table data={quest?.data.groups} keyField="_id">
              <Column
                header="Avatar"
                field="pictureUrl"
                component={AvatarTable}
                value={""}
              />
              <Column header="Name" field="name" />
              <Column header="Expérience" field="experience" />
              <Column header="Spécialité" field="speciality.name" />
            </Table>
            <p style={{ marginTop: "15px" }}>
              {/* TODO: Add calculated amount */}
              <strong>Coût max. de la mission: </strong> 2500{" "}
              <FontAwesomeIcon icon={faCoins} />
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
            {isRequest && <Button label="Valider l'équipe" variant="success" />}
            {!isRequest && (
              <Button label="Lancer la mission" variant="success" />
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default QuestDetails;
