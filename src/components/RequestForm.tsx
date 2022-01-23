import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import React, { FC, useState } from "react";
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
import { Option } from "react-rainbow-components/components/Select";
import request from "../axios";
import { AdventurerProfile } from "../sdk/adventurers";
import { QuestStatus } from "../sdk/quest";
import { Request, RequestToCreate } from "../sdk/request";
import { Speciality } from "../sdk/speciality";
import daysToSeconds from "../utils/daysToSeconds";

type ModalRequestFormType = {
  isOpen: boolean;
  setOpen: Function;
};

const ModalRequestForm: FC<ModalRequestFormType> = ({ isOpen, setOpen }) => {
  const [speciality, setSpeciality] = useState("");
  const [adventurerExp, setAdventurerExp] = useState(0);
  const [requiredProfiles, setRequiredProfiles] = useState<AdventurerProfile[]>(
    []
  );
  const [requiredProfilesToSend, setRequiredProfilesToSend] = useState<
    { speciality: string; experience: number }[]
  >([]);
  const dateNow = new Date(Date.now());
  const [dateTime, setDateTime] = useState(dateNow);

  const handleOnSelectSpeciality = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpeciality(event.target.value);
  };

  const handleOnSelectExp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdventurerExp(parseInt(event.target.value));
  };

  const { data: dataSpecialities } = useQuery("fetchSpecialities", () =>
    request.get("/adventurers/specialities")
  );
  const specialities: Speciality[] = dataSpecialities?.data;

  const options: Option[] = [{ label: "---", value: "---" }];
  if (dataSpecialities?.data) {
    specialities.forEach((speciality) => {
      options.push({
        label: speciality.name,
        value: speciality.name,
      });
    });
  }

  const { control, handleSubmit, reset } = useForm<Request>();

  const handleModalClose = () => {
    reset();
    setOpen(false);
  };

  const handleAddAdventurer = (value: string) => {
    const chosenSpeciality = specialities.find(
      (speciality) => speciality.name === value
    );
    if (!chosenSpeciality) {
      return;
    }
    const adventurer: AdventurerProfile = {
      speciality: chosenSpeciality,
      experience: adventurerExp,
    };
    setRequiredProfiles((old) => [...old, adventurer]);

    const adventurerToSend: { speciality: string; experience: number } = {
      speciality: chosenSpeciality?._id,
      experience: adventurerExp,
    };
    setRequiredProfilesToSend((old) => [...old, adventurerToSend]);
  };

  const handleRemoveAdventurer = (index: number) => {
    const profilesToSplice = requiredProfiles;

    const profilesSpliced = profilesToSplice.splice(index, 1);
    const difference = requiredProfiles.filter(
      (x) => !profilesSpliced.includes(x)
    );

    setRequiredProfiles(difference);
  };

  const { mutateAsync } = useMutation<
    AxiosResponse<{ access_token?: string }>,
    Error,
    RequestToCreate
  >((params) => request.post("requests", params));

  const onSubmit = handleSubmit(async (data) => {
    const durationToCreate: number = daysToSeconds(data.duration);

    const requestToCreate: RequestToCreate = {
      name: data.name,
      description: data.description,
      awardedExperience: +data.awardedExperience,
      bounty: +data.bounty,
      dateDebut: dateTime,
      duration: durationToCreate,
      questGiver: data.questGiver,
      pictureUrl: data.pictureUrl,
      requiredProfiles: requiredProfilesToSend,
      status: QuestStatus.Unassigned,
    };

    await mutateAsync(requestToCreate);
    handleModalClose();
  });

  return (
    <Modal
      id="modal-request-form"
      isOpen={isOpen}
      onRequestClose={() => handleModalClose()}
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
                className="rainbow-p-around_medium form-add-request-name-cy"
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
                className="rainbow-p-around_medium form-add-request-giver-cy"
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
              className="rainbow-p-around_medium form-add-request-desc-cy"
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
                min={0}
                label="Prime"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium form-add-request-prime-cy"
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
                min={0}
                label="Expérience"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium form-add-request-axp-cy"
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
                min={0}
                label="Durée (en jours)"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium form-add-request-duration-cy"
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
                label="Date de début"
                value={dateTime}
                onChange={(value) => {
                  setDateTime(value);
                }}
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
              min={0}
              label="Expérience d'aventurier"
              value={adventurerExp}
              onChange={handleOnSelectExp}
              style={{ margin: "12px" }}
              className="form-add-request-xp-cy"
            />
            <div>
              <ButtonIcon
                variant="neutral"
                tooltip="Ajouter le profil d'aventurier"
                disabled={!!(speciality === "" || speciality === "---")}
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => handleAddAdventurer(speciality)}
                style={{ marginTop: "24px" }}
                className="btn-add-req-profile"
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
                    style={{
                      marginLeft: 0,
                      marginRight: 10,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    key={i}
                    className="rainbow-m-around_medium "
                    variant="outline-brand"
                  >
                    <span className="badge-add-req-profile-cy">
                      {profile.speciality?.name} {profile.experience}XP
                    </span>
                    <ButtonIcon
                      variant="neutral"
                      size="small"
                      tooltip="Retirer le profil d'aventurier"
                      icon={<FontAwesomeIcon icon={faTimes} />}
                      onClick={() => handleRemoveAdventurer(i)}
                      style={{ marginLeft: "8px" }}
                      className="badge-del-req-profile-cy"
                    />
                  </Badge>
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
            className="rainbow-m-around_medium btn-add-cy"
            disabled={requiredProfiles.length === 0}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalRequestForm;
