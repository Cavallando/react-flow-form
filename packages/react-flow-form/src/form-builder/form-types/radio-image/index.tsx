import React, { useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { RadioImageStep } from "../step";
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
    // @ts-ignore
  >(getValues(formId));

  const handleChange = (option: RadioImageStep["values"]["0"]) => {
    // @ts-ignore
    let valueSelected = getValues(formId);
    if (!valueSelected) {
      // @ts-ignore
      valueSelected = {} as PathValue<FormValues, Path<FormValues>>;
    }

    if (valueSelected.value === option.value) {
      setItemChecked({} as PathValue<FormValues, Path<FormValues>>);
      // @ts-ignore
      setValue(formId, {});
    } else {
      setItemChecked(option as PathValue<FormValues, Path<FormValues>>);
      // @ts-ignore
      setValue(formId, option);
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
