import React from "react";
import { RadioImage, Checkbox, Select, InputText } from "../../form-types";
import { QuestionWrapper, AnswersWrapper, QuestionTitle } from "./styled";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { StepContent } from "../../form-types/step";

type QuestionProps<FormValues extends FieldValues> = {
  content: StepContent[];
  title: string;
  control: UseFormReturn<FormValues>["control"];
  register: UseFormReturn<FormValues>["register"];
  setValue: UseFormReturn<FormValues>["setValue"];
  getValues: UseFormReturn<FormValues>["getValues"];
  formId?: Path<FormValues>;
};

function Question<FormValues extends FieldValues>({
  content,
  title,
  control,
  register,
  setValue,
  getValues,
  formId,
}: QuestionProps<FormValues>) {
  const formType = (item: StepContent) => {
    switch (item.type) {
      case "radio-image":
        return (
          <RadioImage<FormValues>
            control={control}
            getValues={getValues}
            setValue={setValue}
            formId={formId!}
            values={item.values}
          />
        );
      case "checkbox":
        return (
          <Checkbox<FormValues>
            control={control}
            getValues={getValues}
            setValue={setValue}
            formId={formId!}
            values={item.values}
          />
        );
      case "select":
        return (
          <Select<FormValues>
            control={control}
            getValues={getValues}
            setValue={setValue}
            formId={formId!}
            values={item.values}
          />
        );
      case "input":
        return (
          <InputText
            register={register}
            formId={formId!}
            placeholder={item.placeholder}
          />
        );
      default:
        break;
    }

    return undefined;
  };

  return (
    <QuestionWrapper>
      <QuestionTitle>{title}</QuestionTitle>
      <AnswersWrapper>
        {content.map((item, index) => (
          <div key={index}>{formType(item)}</div>
        ))}
      </AnswersWrapper>
    </QuestionWrapper>
  );
}

export default Question;
