import React, { useState, useEffect, useRef } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
  UseFormReturn,
} from "react-hook-form";
import { SelectStep } from "../../../utils/steps";
import { SelectWrapper, InputSelect, OptionsWrapper, Option } from "./styled";

// Hook
function useOnClickOutside(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      // @ts-ignore
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

type SelectProps<FormValues extends FieldValues> = {
  values: SelectStep["values"];
  control: UseFormReturn<FormValues>["control"];
  setValue: UseFormReturn<FormValues>["setValue"];
  getValues: UseFormReturn<FormValues>["getValues"];
  formId: Path<FormValues>;
};

function Select<FormValues extends FieldValues>({
  values,
  formId,
  setValue,
  getValues,
}: SelectProps<FormValues>) {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [itemChecked, setItemChecked] = useState(getValues(formId) || {});

  useOnClickOutside(selectRef, () => {
    setMenuIsOpen(false);
  });

  const handleChange = (option: SelectStep["values"]["0"]) => {
    let valueSelected = getValues(formId);
    if (!valueSelected) {
      valueSelected = {} as PathValue<FormValues, Path<FormValues>>;
    }

    if (valueSelected.value === option.value) {
      setItemChecked({});
      setValue(
        formId,
        {} as UnpackNestedValue<PathValue<FormValues, Path<FormValues>>>
      );
    } else {
      setItemChecked(option);
      setValue(
        formId,
        option as UnpackNestedValue<PathValue<FormValues, Path<FormValues>>>
      );
    }

    setMenuIsOpen(false);
  };

  return (
    <SelectWrapper ref={selectRef}>
      <InputSelect
        value={(itemChecked as { label: string }).label}
        placeholder="Type or select an option"
        onFocus={() => setMenuIsOpen(true)}
      />
      {menuIsOpen && (
        <OptionsWrapper>
          {values.map((val) => (
            <Option
              selected={(itemChecked as { value: string }).value === val.value}
              onClick={() => handleChange(val)}
              key={val.value}
            >
              {val.label}
            </Option>
          ))}
        </OptionsWrapper>
      )}
    </SelectWrapper>
  );
}

export default Select;
