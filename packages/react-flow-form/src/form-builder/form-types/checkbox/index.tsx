import React, { useState } from "react";
import {
  ArrayPath,
  FieldValues,
  Path,
  PathValue,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";
import { SelectStep } from "../step";
import { CheckboxWrapper, CheckboxOption } from "./styled";

type CheckboxProps<FormValues extends FieldValues> = {
  values: SelectStep["values"];
  formId: Path<FormValues>;
  setValue: UseFormReturn<FormValues>["setValue"];
  getValues: UseFormReturn<FormValues>["getValues"];
  control: UseFormReturn<FormValues>["control"];
};

function Checkbox<FormValues extends FieldValues>({
  values,
  formId,
  setValue,
  getValues,
  control,
}: CheckboxProps<FormValues>) {
  // @ts-ignore
  const [itemsChecked, setItemsChecked] = useState(getValues(formId));

  const { remove } = useFieldArray({
    control,
    // @ts-ignore
    name: formId as ArrayPath<FormValues>,
  });

  const handleChange = (option: { label: string; value: string }) => {
    // @ts-ignore
    let values = getValues(formId);
    if (!values) {
      // @ts-ignore
      values = [] as PathValue<FormValues, Path<FormValues>>;
    }

    const indexFound = values.findIndex(
      (item: { value: string }) => item.value === option.value
    );

    if (indexFound > -1) {
      remove(indexFound);
      const valuesToSave = values.filter(
        (item: { value: string }) => item.value !== option.value
      );
      setItemsChecked(valuesToSave);
    } else {
      const valuesToSave = [
        ...values,
        option as PathValue<FormValues, Path<FormValues>>,
      ];
      setItemsChecked(valuesToSave as PathValue<FormValues, Path<FormValues>>);
      setValue(
        // @ts-ignore
        formId,
        valuesToSave
      );
    }
  };

  return (
    <CheckboxWrapper>
      {values.map((val) => (
        <CheckboxOption key={val.value}>
          <span>{val.label}</span>
          <input
            defaultChecked={itemsChecked.some(
              (item: { value: string }) => item.value === val.value
            )}
            onClick={() => handleChange(val)}
            type="checkbox"
            name={formId}
            value={val.value}
          />
          <div></div>
        </CheckboxOption>
      ))}
    </CheckboxWrapper>
  );
}

export default Checkbox;
