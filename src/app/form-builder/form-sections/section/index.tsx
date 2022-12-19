import React from "react";
import { SectionWrapper, Text } from "./styled";
import { ButtonComp } from "app/form-builder/form-components";
import { StepContent } from "../../../utils/steps";

type SectionProps = {
  content: StepContent[];
  onNextStep: () => void;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
};

const Section: React.FC<SectionProps> = ({
  content,
  onNextStep,
  hideNextButton = false,
}) => {
  return (
    <SectionWrapper>
      {content.map((item, index) =>
        item.type === "text" ? <Text key={index}>{item.value}</Text> : undefined
      )}
      {!hideNextButton && <ButtonComp onClick={onNextStep}>Sure</ButtonComp>}
    </SectionWrapper>
  );
};

export default Section;
