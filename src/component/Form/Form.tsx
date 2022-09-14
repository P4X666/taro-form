import React, {
  forwardRef,
  useImperativeHandle,
  ReactNode,
  createContext
} from "react";
import useFormStore, { FormState } from "./useFormStore";

export type RenderProps = (form: FormState) => ReactNode;

export interface FormProps {
  initialValues?: Record<string, any>;
  children: JSX.Element[] | RenderProps;
  /** 字段更新时触发回调事件 */
  onFieldsChange?: (changedValues: Record<string, any>) => void;
  className?: string;
}

export type IFormContext = Pick<
  ReturnType<typeof useFormStore>,
  "dispatch" | "fields" | "validateField"
> &
  Omit<FormProps, "children">;

export type FormInstance = Omit<
  ReturnType<typeof useFormStore>,
  "fields" | "dispatch" | "form"
>;


export const FormContext = createContext<IFormContext>({} as IFormContext);

const Form = forwardRef<FormInstance, FormProps>((props, ref) => {
    const { children, initialValues, onFieldsChange, className='' } = props;
    const { form, fields, dispatch, ...restProps } = useFormStore(
      initialValues
    );
    const { validateField } = restProps;
    /** 绑定在 form 实例上的方法，外部可直接使用 */
    useImperativeHandle(
      ref,
      (): FormInstance => {
        return {
          ...restProps
        };
      }
    );
    const context = {
      dispatch,
      fields,
      initialValues,
      validateField,
      onFieldsChange,
      className
    };

    // 支持自定义渲染
    let childrenNode: ReactNode;
    if (typeof children === "function") {
      childrenNode = children(form);
    } else {
      childrenNode = children;
    }
    return (
      <FormContext.Provider value={context}>
        {childrenNode}
      </FormContext.Provider>
    );
  }
);

export default Form;
