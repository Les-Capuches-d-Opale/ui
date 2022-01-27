import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays, format, isBefore, parseISO } from "date-fns";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  Accordion,
  AccordionSection,
  ButtonIcon,
  Spinner,
} from "react-rainbow-components";
import request from "../../../axios";
import { QuestStatus } from "../../../sdk/quest";
import { Request, RequestListType } from "../../../sdk/request";
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
  awardedExperience?: number;
  rejected?: boolean;
  asap?: boolean;
  questGiver?: string;
}

async function fetchRequests(queryParams: QueryParams) {
  const { data } = await request.get("/requests", {
    params: {
      name: queryParams.name ? queryParams.name : undefined,
      bountyMin: queryParams.bountyMin,
      bountyMax: queryParams.bountyMax,
      awardedExperience: queryParams.awardedExperience,
      questGiver: queryParams.questGiver,
    },
  });
  return data;
}

const RequestList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const [filters, setFilters] = useState<QueryParams>({});

  const { isLoading, data: dataRequest } = useQuery<RequestListType>(
    ["request", filters],
    () => fetchRequests(filters),
    { staleTime: 5000 }
  );

  const requestData = useMemo(() => {
    if (filters.rejected) {
      return dataRequest?.requests.filter(
        (request) => request.status !== QuestStatus.Rejected
      );
    }
    if (filters.asap) {
      const today = new Date();
      return dataRequest?.requests.filter((request) =>
        isBefore(
          new Date(format(parseISO(request.dateFin), "yyyy-MM-dd")),
          addDays(today, 5)
        )
      );
    }
    return dataRequest?.requests;
  }, [dataRequest]);

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
            className="btn-add-request-cy"
          />
          <ModalRequestForm isOpen={isOpen} setOpen={setIsOpen} />
        </span>
      </div>
      {isLoading && <Spinner className="loader-cy" />}
      {(!requestData || requestData.length === 0) && (
        <p> Pas de requètes à affecter</p>
      )}
      <Filter setFiltered={setFilters} />
      <CountOfList>{dataRequest?.counts} requètes</CountOfList>
      {requestData && requestData.length > 0 && (
        <Accordion className="accordion-req-cy">
          {requestData.map((req) => {
            const requestToDisplay: Request = {
              _id: req._id,
              awardedExperience: req.awardedExperience,
              bounty: req.bounty,
              dateDebut: format(parseISO(req.dateDebut), "yyyy-MM-dd"),
              dateFin: format(parseISO(req.dateFin), "yyyy-MM-dd"),
              description: req.description,
              name: req.name,
              requiredProfiles: req.requiredProfiles,
              pictureUrl: req.pictureUrl,
              questGiver: req.questGiver,
              status: req.status,
            };
            return (
              <AccordionSection
                label={<Label {...requestToDisplay} />}
                key={req._id}
              >
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
    </Container>
  );
};

export default RequestList;
