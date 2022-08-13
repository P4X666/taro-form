import { ReactNode } from "react";
import useFormStore from "../useFormStore";
import { FormState } from "./FormStore";

export type RenderProps = (form: FormState) => ReactNode;

export interface FormProps {
  initialValues?: Record<string, any>;
  children: JSX.Element[] | RenderProps;
  /** 字段更新时触发回调事件 */
  onFieldsChange?: (changedValues: Record<string, any>) => void;
}

export type IFormContext = Pick<
  ReturnType<typeof useFormStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<FormProps, "initialValues"> &
  Pick<FormProps, "onFieldsChange">;

export type FormInstance = Omit<
  ReturnType<typeof useFormStore>,
  "fields" | "dispatch" | "form"
>;
