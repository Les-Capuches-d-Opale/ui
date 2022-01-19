import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { Button } from "react-rainbow-components";
import { useHistory } from "react-router-dom";
import axiosRequest from "../../../axios";
import { FilteredRequiredAdventurer } from "../../../contexts/adventurersAffected";
import Routes from "../../../sdk/routes";

interface RequestFormType {
  groups: FilteredRequiredAdventurer[];
  request: string;
}

interface ButtonProps {
  groups: FilteredRequiredAdventurer[];
  request: string;
  disabled: boolean;
}

const AffectButton = ({ groups, request, disabled }: ButtonProps) => {
  const history = useHistory();
  const { mutateAsync } = useMutation<AxiosResponse, Error, RequestFormType>(
    (params) => axiosRequest.post("quests", params)
  );

  return (
    <Button
      variant="brand"
      onClick={async () => {
        await mutateAsync({ groups, request });
        history.push(Routes.QUESTS);
      }}
      disabled={disabled}
    >
      Valider ces aventuriers
    </Button>
  );
};

export default AffectButton;
