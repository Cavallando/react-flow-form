import React from "react";
import { FieldValues } from "react-hook-form";
import GlobalStyle from "./styles/global";
import {
  FormBuilderProps,
  FormBuilder as FormBuilderComponent,
} from "./form-builder";

export function FormBuilder<FormValues extends FieldValues>(
  props: FormBuilderProps<FormValues>
) {
  return (
    <div>
      <GlobalStyle />
      <FormBuilderComponent {...props} />
    </div>
  );
}

export * from "./form-builder";
