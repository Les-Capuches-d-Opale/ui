import { AxiosResponse } from "axios";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Modal, Button, Input, Textarea } from "react-rainbow-components";
import request from "../axios";

type ModalRequestFormType = {
  isOpen: boolean;
  setOpen: Function;
};

type RequestFormType = {
  name: string;
  description: string;
  pictureURL: string;
  questGiver: string;
  bounty: number;
  duration: number;
  awardedExperience: number;
  status: string;
  startDate: string;
};

const ModalRequestForm: FC<ModalRequestFormType> = ({ isOpen, setOpen }) => {
  const { control, handleSubmit } = useForm<RequestFormType>();

  const { mutateAsync } = useMutation<
    AxiosResponse<{ access_token?: string }>,
    Error,
    RequestFormType
  >((params) => request.post("requests", params));

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
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
            name="pictureURL"
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
          <Controller
            control={control}
            name="bounty"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                label="Prime"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
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
            name="duration"
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Input
                required
                label="Durée"
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
                label="Expérience"
                style={{ width: "100%" }}
                className="rainbow-p-around_medium"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            label="Valider"
            shaded
            variant="brand"
            className="rainbow-m-around_medium"
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalRequestForm;
