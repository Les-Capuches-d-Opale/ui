import React, { useState } from "react";
import {
  Button,
  ProgressIndicator,
  ProgressStep,
} from "react-rainbow-components";
import { Adventurer, AdventurerProfile } from "../../../sdk/adventurers";
import CenterBlock from "../../Core/CenterBlock";
import SelectedTable from "./Tables/SelectedTable";
import TablesTab from "./Tables";
import { useAdventurersAffected } from "../../../contexts/adventurersAffected";
import AffectButton from "./AffectButton";

const stepNames = ["Choisir", "Affecter"];

interface StepsProps {
  requiredProfiles: AdventurerProfile[];
  adventurers: Adventurer[];
  requestId: string;
}

const Steps = ({ adventurers, requiredProfiles, requestId }: StepsProps) => {
  const { adventurersAffected } = useAdventurersAffected();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    <TablesTab
      requiredProfiles={requiredProfiles}
      adventurers={adventurers}
      key={stepNames[0]}
    />,
    <SelectedTable requiredProfiles={requiredProfiles} key={stepNames[1]} />,
  ];

  const handleClick = () => {
    if (currentStepIndex < stepNames.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
    }
    if (currentStepIndex > 0) {
      const previewStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(previewStepIndex);
    }
  };

  const isLast = currentStepIndex > 0 && currentStepIndex < stepNames.length;

  const allAdventurersIsAffected =
    adventurersAffected &&
    adventurersAffected.map((affectedAd) => affectedAd.reqProfile).length ===
      adventurersAffected.length;

  return (
    <div className="rainbow-m-bottom_large rainbow-m-top_xx-large rainbow-p-bottom_large">
      <ProgressIndicator currentStepName={stepNames[currentStepIndex]}>
        {stepNames.map((stepName, i) => (
          <ProgressStep name={stepName} label={stepNames[i]} key={i} />
        ))}
      </ProgressIndicator>
      <div className="rainbow-m-top_xx-large ">{steps[currentStepIndex]}</div>
      <CenterBlock>
        {isLast && (
          <>
            <div>
              <Button
                label="??tape pr??c??dente"
                onClick={handleClick}
                variant="outline-brand"
                className="rainbow-m-horizontal_medium"
              />
            </div>
            <AffectButton
              request={requestId}
              groups={adventurersAffected || []}
              disabled={!allAdventurersIsAffected}
            />
          </>
        )}
        {!isLast && (
          <Button
            label={"??tape suivante"}
            onClick={handleClick}
            variant="brand"
            className="rainbow-m-horizontal_medium"
            disabled={
              !adventurersAffected ||
              adventurersAffected.length < requiredProfiles.length
            }
          />
        )}
      </CenterBlock>
    </div>
  );
};

export default Steps;
