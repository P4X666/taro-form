import { FC } from "react";
import { CustomRule } from "./FormStore";

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;
export interface FormItemProps {
  name: string;
  // 标签文本
  label?: string;
  children: JSX.Element;
  // { value: any, onChange: () => { } }
  /**子节点的值的属性，如 checkbox 的是 'checked' */
  // valuePropName?: string,
  /**设置收集字段值变更的时机 */
  // trigger?: string;
  /**设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any;
  /**校验规则，设置字段的校验逻辑。请看 async validator 了解更多规则 */
  rules?: CustomRule[];
  /**设置字段校验的时机 */
  validateTrigger?: "onBlur" | "onChange";
  /** 子组件是否为上下结构 */
  isNewLine?: boolean;
  className?: string;
  /** 底部 border */
  border?: boolean;
  onErrorClick?: () => void;
  /** 必填样式设置。如不设置，则会根据校验规则自动生成 */
  required?: boolean;
}

export type FormC<P = {}> = FC<P>;
