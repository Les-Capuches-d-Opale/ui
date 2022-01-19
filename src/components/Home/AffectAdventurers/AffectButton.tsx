import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { Button } from "react-rainbow-components";
import { useHistory } from "react-router-dom";
import axiosRequest from "../../../axios";
import { FilteredRequiredAdventurer } from "../../../contexts/adventurersAffected";
import Routes from "../../../sdk/routes";

interface Group {
  reqProfile: {
    id: string | undefined;
    experience: number | undefined;
  };
  adventurer: string;
}

interface PayloadAffectAdventurer {
  groups: Group[];
  request: string;
}

interface ButtonProps {
  groups: FilteredRequiredAdventurer[];
  request: string;
  disabled: boolean;
}

const AffectButton = ({ groups, request, disabled }: ButtonProps) => {
  const history = useHistory();
  const { mutateAsync } = useMutation<
    AxiosResponse,
    Error,
    PayloadAffectAdventurer
  >((params) => axiosRequest.post("quests", params));

  const formatGroups: Group[] = groups.map(({ reqProfile, adventurer }) => {
    return {
      reqProfile: {
        id: reqProfile?.speciality._id,
        experience: reqProfile?.experience,
      },
      adventurer: adventurer._id,
    };
  });

  return (
    <Button
      variant="brand"
      onClick={async () => {
        await mutateAsync({ groups: formatGroups, request });
        history.push(Routes.QUESTS);
      }}
      disabled={disabled}
    >
      Valider ces aventuriers
    </Button>
  );
};

export default AffectButton;
