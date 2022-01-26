import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Button, Input, Modal, Select } from "react-rainbow-components";
import request from "../../axios";
import { AdventurerToCreate } from "../../sdk/adventurers";
import { Speciality } from "../../sdk/speciality";

type ModalAdventurerFormType = {
  isOpen: boolean;
  setOpen: Function;
};

const ModalAdventurerForm: FC<ModalAdventurerFormType> = ({
  isOpen,
  setOpen,
}) => {
  const [speciality, setSpeciality] = useState("");
  const { control, handleSubmit } = useForm<AdventurerToCreate>();

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

  const handleOnSelectSpeciality = (event: any) => {
    setSpeciality(event.target.value);
  };

  const { mutateAsync } = useMutation<
    AxiosResponse<{ access_token?: string }>,
    Error,
    AdventurerToCreate
  >((params) => request.post("adventurers", params));

  const onSubmit = handleSubmit(async (data) => {
    const chosenSpeciality = specialities.find(
      (chosenSpeciality) => chosenSpeciality.name === speciality
    );

    const adventurerToCreate: AdventurerToCreate = {
      name: data.name,
      speciality: chosenSpeciality?._id,
      baseDailyRate: +data.baseDailyRate,
      experience: +data.experience,
      pictureURL: data.pictureURL,
    };

    await mutateAsync(adventurerToCreate);

    setOpen(false);
  });

  return (
    <Modal
      id="modal-request-form"
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      title="Nouvel aventurier"
      size="medium"
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
                label="Nom de l'aventurier"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium form-add-adventurers-name-cy"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="pictureURL"
            defaultValue={
              "https://img.huffingtonpost.com/asset/5e2ee34f240000e5020b501f.jpeg?cache=66hH6JXnKE&ops=crop_26_306_1973_1528,scalefit_630_noupscale"
            }
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
            name="baseDailyRate"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                isCentered
                type="number"
                label="Taux journalier"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium form-add-adventurers-tj-cy"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
            name="experience"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                isCentered
                type="number"
                label="Expérience"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium form-add-adventurers-xp-cy"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Select
            label="Classe"
            required
            options={options}
            value={speciality}
            onChange={handleOnSelectSpeciality}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            label="Valider"
            shaded
            variant="brand"
            className="rainbow-m-around_medium btn-add-cy"
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAdventurerForm;
