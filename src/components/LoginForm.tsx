import { AxiosResponse } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button, Input } from "react-rainbow-components";
import { Redirect } from "react-router-dom";
import request from "../axios";
import { useAuth } from "../contexts/auth";
import Routes from "../sdk/routes";

type LoginFormType = {
  email: string;
  password: string;
};

const inputStyle = {
  width: "400px",
};

const LoginForm = () => {
  const { authUser, setAuthUser } = useAuth();
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormType>();

  const { mutateAsync, isLoading, error } = useMutation<
    AxiosResponse<{ access_token?: string }>,
    Error,
    LoginFormType
  >((params) => request.post("administrators/login", params));

  const onSubmit = handleSubmit(async (data) => {
    try {
      setWrongCredentials(false);
      const result = await mutateAsync(data);

      setAuthUser?.({
        token: result.data.access_token || authUser?.token,
      });
    } catch (error) {
      setWrongCredentials(true);
    }
  });

  if (authUser) {
    return <Redirect to={Routes.HOME} />;
  }

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <Input
            required
            label="Email"
            type="email"
            className="rainbow-p-around_medium login-email-cy"
            style={inputStyle}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <Input
            required
            label="Mot de passe"
            type="password"
            className="rainbow-p-around_medium login-password-cy"
            style={inputStyle}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {(wrongCredentials || error) && (
        <p className="login-wrong-credential-cy">
          L'email ou le mot de passe est incorrect
        </p>
      )}
      <Button
        type="submit"
        label="Valider"
        shaded
        variant="brand"
        className="rainbow-m-around_medium login-btn-cy"
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
