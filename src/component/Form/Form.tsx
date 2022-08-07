import React, { forwardRef, useImperativeHandle, ReactNode, createContext } from 'react';
import useFormStore, { FormState } from './useFormStore';

export const FormContext = createContext<IFormContext>({} as IFormContext)

export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  initialValues?: Record<string, any>,
  children: JSX.Element[] | RenderProps
}
export type IFormContext =
  Pick<ReturnType<typeof useFormStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<FormProps, 'initialValues'>
export type IFormRef = Omit<ReturnType<typeof useFormStore>, 'fields' | 'dispatch' | 'form'>
const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { children, initialValues } = props;
  const { form, fields, dispatch, ...restProps } = useFormStore(initialValues);
  const { validateField } = restProps;
  /** 绑定在 form 实例上的方法，外部可直接使用 */
  useImperativeHandle(ref, () => {
    return {
      ...restProps
    };
  });
  const context = {
    dispatch,
    fields,
    initialValues,
    validateField
  };

  // 支持自定义渲染
  let childrenNode: ReactNode;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return <FormContext.Provider value={context}>
    {childrenNode}
  </FormContext.Provider>;
});


export default Form;
