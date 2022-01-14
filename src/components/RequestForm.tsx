import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  Badge,
  Button,
  ButtonIcon,
  DateTimePicker,
  Input,
  Modal,
  Select,
  Textarea,
} from "react-rainbow-components";
import request from "../axios";
import { Speciality } from "../sdk/speciality";
import { Request, RequestToCreate } from "../sdk/request";
import { format, parse } from "date-fns";
import { QuestStatus } from "../sdk/quest";
import daysToSeconds from "../utils/daysToSeconds";

type ModalRequestFormType = {
  isOpen: boolean;
  setOpen: Function;
};

const ModalRequestForm: FC<ModalRequestFormType> = ({ isOpen, setOpen }) => {
  const [speciality, setSpeciality] = useState("");
  const [adventurerExp, setAdventurerExp] = useState(0);
  const [requiredProfiles, setRequiredProfiles] = useState<any[]>([]);
  const [requiredProfilesToSend, setRequiredProfilesToSend] = useState<any[]>(
    []
  );
  const dateNow = new Date(Date.now());
  const [dateTime, setDateTime] = useState(dateNow);

  const handleOnSelectSpeciality = (event: any) => {
    setSpeciality(event.target.value);
  };

  const handleOnSelectExp = (event: any) => {
    setAdventurerExp(parseInt(event.target.value));
  };

  const { data: dataSpecialities } = useQuery("fetchSpecialities", () =>
    request.get("/adventurers/specialities")
  );
  const specialities: Speciality[] = dataSpecialities?.data;

  const options: any[] = [{ label: "---", value: "---" }];
  if (dataSpecialities?.data) {
    specialities.forEach((speciality) => {
      options.push({
        label: speciality.name,
        value: speciality.name,
      });
    });
  }

  const handleAddAdventurer = (value: string) => {
    const chosenSpeciality = specialities.find(
      (speciality) => speciality.name === value
    );
    const adventurer = {
      speciality: chosenSpeciality,
      experience: adventurerExp,
    };
    setRequiredProfiles((old) => [...old, adventurer]);

    const adventurerToSend = {
      speciality: chosenSpeciality?._id,
      experience: adventurerExp,
    };
    setRequiredProfilesToSend((old) => [...old, adventurerToSend]);
  };

  const { control, handleSubmit } = useForm<Request>();

  const { mutateAsync } = useMutation<
    AxiosResponse<{ access_token?: string }>,
    Error,
    RequestToCreate
  >((params) => request.post("requests", params));

  const onSubmit = handleSubmit(async (data) => {
    const durationToCreate: number = daysToSeconds(data.duration);

    const dateToSend = format(
      parse(data.dateDebut, "dd/MM/yyyy", new Date()),
      "yyyy-MM-dd"
    );

    const requestToCreate: RequestToCreate = {
      name: data.name,
      description: data.description,
      awardedExperience: +data.awardedExperience,
      bounty: +data.bounty,
      dateDebut: dateToSend,
      duration: durationToCreate,
      questGiver: data.questGiver,
      pictureUrl: data.pictureUrl,
      requiredProfiles: requiredProfilesToSend,
      status: QuestStatus.Unassigned,
    };

    await mutateAsync(requestToCreate);
  });

  return (
    <Modal
      id="modal-request-form"
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      title="Nouvelle requête"
      size="large"
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
            name="name"
            defaultValue={""}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                label="Nom de la requête"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="pictureUrl"
            defaultValue={"https://picsum.photos/200/300"}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                label="Photo"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="questGiver"
            defaultValue={""}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                label="Donneur de quête"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="description"
          defaultValue={""}
          render={({ field: { value, onChange } }) => (
            <Textarea
              required
              label="Description"
              className="rainbow-p-around_medium"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
            name="bounty"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                isCentered
                type="number"
                label="Prime"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="awardedExperience"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                isCentered
                type="number"
                label="Expérience"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="duration"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                isCentered
                type="number"
                label="Durée (en jours)"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="dateDebut"
            defaultValue={dateTime.toLocaleDateString()}
            render={() => (
              <DateTimePicker
                id="datetimepicker-1"
                label="DateTimePicker label"
                value={dateTime}
                onChange={(value) => setDateTime(value)}
                formatStyle="large"
                hour24
              />
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select
              label="Choisir une classe"
              options={options}
              value={speciality}
              onChange={handleOnSelectSpeciality}
              style={{ margin: "12px" }}
            />
            <Input
              isCentered
              type="number"
              label="Expérience d'aventurier"
              value={adventurerExp}
              onChange={handleOnSelectExp}
              style={{ margin: "12px" }}
            />
            <div>
              <ButtonIcon
                variant="neutral"
                tooltip="Ajouter aventurier"
                disabled={!!(speciality === "" || speciality === "---")}
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => handleAddAdventurer(speciality)}
                style={{ marginTop: "24px" }}
              />
            </div>
          </div>
          <div
            style={{
              width: "50%",
              height: "150px",
              overflowX: "auto",
              overflowY: "scroll",
            }}
          >
            {requiredProfiles &&
              requiredProfiles.length > 0 &&
              requiredProfiles.map((profile, i) => {
                return (
                  <Badge
                    style={{ marginLeft: 0, marginRight: 10 }}
                    key={i}
                    className="rainbow-m-around_medium"
                    label={`${profile.speciality?.name} ${profile.experience}XP`}
                    variant="outline-brand"
                  />
                );
              })}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            label="Valider"
            shaded
            variant="brand"
            className="rainbow-m-around_medium"
            disabled={requiredProfiles.length === 0}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalRequestForm;
