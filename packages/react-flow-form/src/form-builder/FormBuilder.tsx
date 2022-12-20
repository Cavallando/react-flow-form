import React from "react";
import { useState, useEffect } from "react";
import { Step } from "./form-types/step";
import {
  FormBuilderWrapper,
  StepWrapper,
  ArrowsWrapper,
  ArrowsButton,
} from "./styled";
import { Section, Question } from "./form-sections";
import { FieldValues, useForm } from "react-hook-form";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { PageWrapper } from "./styled";

export type FormBuilderProps<FormValues extends FieldValues> = {
  data: Step<FormValues>[];
};

export function FormBuilder<FormValues extends FieldValues>({
  data,
}: FormBuilderProps<FormValues>) {
  const { register, control, reset, setValue, getValues } =
    useForm<FormValues>();
  const [currentIndexForm, setCurrentIndexForm] = useState(0);
  const [classNameState, setClassNameState] = useState("fade");

  useEffect(() => {
    const values = getValues();
    localStorage.setItem("form-values", JSON.stringify(values));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndexForm]);

  useEffect(() => {
    const formValues = localStorage.getItem("form-values");
    if (formValues) {
      reset(JSON.parse(formValues));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNewCurrentIndexForm = (newIndex: number) => {
    newIndex > currentIndexForm
      ? setClassNameState("fade")
      : setClassNameState("fade-out");

    setTimeout(() => {
      setCurrentIndexForm(newIndex);
    }, 50);
  };

  const generateFormStep = (step: Step<FormValues>) => {
    switch (step.type) {
      case "section":
        return (
          <Section
            hideNextButton={step.hideNextButton}
            hidePrevButton={step.hidePrevButton}
            content={step.content}
            onNextStep={() => setNewCurrentIndexForm(currentIndexForm + 1)}
          />
        );
      case "question":
        return (
          <Question<FormValues>
            control={control}
            setValue={setValue}
            getValues={getValues}
            register={register}
            formId={step.formId}
            title={step.title}
            content={step.content}
          />
        );
      default:
        break;
    }

    return null;
  };

  const currentStep = data[currentIndexForm];

  return (
    <PageWrapper>
      <FormBuilderWrapper>
        <StepWrapper>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={currentIndexForm}
              // @ts-ignore
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames={classNameState}
            >
              {generateFormStep(currentStep)}
            </CSSTransition>
          </SwitchTransition>
        </StepWrapper>

        <ArrowsWrapper show={currentStep.type === "question"}>
          <ArrowsButton
            onClick={() => setNewCurrentIndexForm(currentIndexForm - 1)}
          >
            <svg height="9" width="14">
              <path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path>
            </svg>
          </ArrowsButton>
          <ArrowsButton
            onClick={() => setNewCurrentIndexForm(currentIndexForm + 1)}
          >
            <svg height="9" width="14">
              <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path>
            </svg>
          </ArrowsButton>
        </ArrowsWrapper>
      </FormBuilderWrapper>
    </PageWrapper>
  );
}
