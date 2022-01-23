import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import {
  Accordion,
  AccordionSection,
  ButtonIcon,
  Spinner,
} from "react-rainbow-components";
import request from "../../../axios";
import { RequestListType } from "../../../sdk/request";
import Container from "../../Core/Container";
import CountOfList from "../../Core/CountOfList";
import ModalRequestForm from "../../RequestForm";
import BadgeList from "./BadgeList";
import Filter from "./Filter";
import Label from "./LabelAccordionRequest";

export interface QueryParams {
  name?: string;
  bountyMin?: number;
  bountyMax?: number;
}

const RequestList: FC<RequestListType> = ({ requests, counts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const [filters, setFilters] = useState<QueryParams>({});

  const { isLoading, data: dataRequest } = useQuery<RequestListType>(
    ["request", filters],
    ({ queryKey }) =>
      request
        .get("/requests", {
          params: {
            bountyMin: (queryKey[1] as QueryParams).bountyMin,
            bountyMax: (queryKey[1] as QueryParams).bountyMax,
            name: (queryKey[1] as QueryParams).name,
          },
        })
        .then((res) => res.data)
  );

  const requestData = dataRequest?.requests || requests;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Liste des requètes</h1>
        <span>
          <ButtonIcon
            variant="neutral"
            tooltip="Créer une requête"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => handleOnClick()}
          />
          <ModalRequestForm isOpen={isOpen} setOpen={setIsOpen} />
        </span>
      </div>

      <>
        {!requestData ||
          (requestData.length === 0 && <p> Pas de requètes correspondantes</p>)}
        <>
          <Filter setFiltered={setFilters} filtered={filters} />
          <CountOfList>{counts} requètes</CountOfList>
          {isLoading ? (
            <Spinner />
          ) : (
            <Accordion>
              {requestData.map((req: any) => {
                return (
                  <AccordionSection label={<Label {...req} />} key={req._id}>
                    {req.description}
                    <div style={{ opacity: 0.5, marginTop: 5 }}>
                      Profils requis :
                    </div>
                    <BadgeList requiredProfiles={req.requiredProfiles} />
                  </AccordionSection>
                );
              })}
            </Accordion>
          )}
        </>
      </>
    </Container>
  );
};

export default RequestList;
