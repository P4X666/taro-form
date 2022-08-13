import { ValidateError, RuleItem } from "async-validator";

export interface ValidateErrorType extends Error {
  // 错误信息
  errors: ValidateError[];
  // 所有的子组件域
  fields: Record<string, ValidateError[]>;
}
export interface FormState {
  // 是否合法
  isValid: boolean;
  // 是否在提交中
  isSubmitting: boolean;
  // 错误信息
  errors: Record<string, ValidateError[]>;
}

export type CustomRuleFunc = ({ getFieldValue }) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}
export interface FieldsAction {
  type: "addField" | "updateValue" | "updateValidateResult";
  name: string;
  value: any;
}
interface validResult {
  /** 表单内容是否合法 */
  isValid: boolean;
  /** 错误信息 */
  errors: Record<string, any>;
  values: {
    [name: string]: string;
  };
}
