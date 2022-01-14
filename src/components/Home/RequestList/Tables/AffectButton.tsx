import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { Button } from "react-rainbow-components";
import { useHistory } from "react-router-dom";
import axiosRequest from "../../../../axios";
import Routes from "../../../../sdk/routes";

interface RequestFormType {
  groups: string[];
  request: string;
}

interface ButtonProps {
  groups: string[];
  request: string;
  disabled: boolean;
}

const AffectButton = ({ groups, request, disabled }: ButtonProps) => {
  const history = useHistory();
  const { mutateAsync } = useMutation<AxiosResponse, Error, RequestFormType>(
    (params) => axiosRequest.post("quests", params)
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <Button
        variant="brand"
        onClick={async () => {
          await mutateAsync({ groups, request });
          history.push(Routes.QUESTS);
        }}
        style={{ marginTop: 20 }}
        disabled={disabled}
      >
        Affecter ces aventuriers
      </Button>
    </div>
  );
};

export default AffectButton;
