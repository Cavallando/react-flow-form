import React, { useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
  UseFormReturn,
} from "react-hook-form";
import { RadioImageStep } from "../../../utils/steps";
import { RadioImagesWrapper, CheckboxOption } from "./styled";

type RadioImageProps<FormValues extends FieldValues> = {
  values: RadioImageStep["values"];
  setValue: UseFormReturn<FormValues>["setValue"];
  getValues: UseFormReturn<FormValues>["getValues"];
  control: UseFormReturn<FormValues>["control"];
  formId: Path<FormValues>;
};

function RadioImage<FormValues extends FieldValues>({
  values,
  formId,
  setValue,
  getValues,
}: RadioImageProps<FormValues>) {
  const [itemChecked, setItemChecked] = useState<
    PathValue<FormValues, Path<FormValues>>
  >(getValues(formId));

  const handleChange = (option: RadioImageStep["values"]["0"]) => {
    let valueSelected = getValues(formId);
    if (!valueSelected) {
      valueSelected = {} as PathValue<FormValues, Path<FormValues>>;
    }

    if (valueSelected.value === option.value) {
      setItemChecked({} as PathValue<FormValues, Path<FormValues>>);
      setValue(
        formId,
        {} as UnpackNestedValue<PathValue<FormValues, Path<FormValues>>>
      );
    } else {
      setItemChecked(option as PathValue<FormValues, Path<FormValues>>);
      setValue(
        formId,
        option as UnpackNestedValue<PathValue<FormValues, Path<FormValues>>>
      );
    }
  };

  return (
    <RadioImagesWrapper>
      {values.map((val) => (
        <CheckboxOption key={val.value}>
          <img src={val.image} alt="" />
          <span>{val.label}</span>
          <input
            defaultChecked={itemChecked.value === val.value}
            onClick={() => handleChange(val)}
            type="radio"
            name={formId}
            value={val.value}
          />
          <div></div>
        </CheckboxOption>
      ))}
    </RadioImagesWrapper>
  );
}

export default RadioImage;
