import React, {
  useContext,
  useEffect,
  FC,
  MouseEvent,
  useCallback,
  useMemo
} from "react";
import FormComponentWrapper from "./FormComponentWrapper";
import {
  getFormItemFirstChildren,
  overlaidOriginalAttr,
  _onErrorClick
} from "./utils";
import { FormContext } from "./Form";
import { FormItemProps, SomeRequired } from "./types/FormItem";

export type FormC<P = {}> = FC<P>;

export const emptyFunction = () => {};

const FormItem: FC<FormItemProps> = props => {
  const {
    name,
    label,
    children,
    // trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
    isNewLine = false,
    className = "",
    border = true,
    required = false,
    onErrorClick = _onErrorClick
  } = props as SomeRequired<
    FormItemProps,
    "getValueFromEvent" | "validateTrigger"
  >;
  const {
    dispatch,
    fields,
    initialValues,
    validateField,
    onFieldsChange = emptyFunction,
    className: formClass
  } = useContext(FormContext);

  useEffect(() => {
    // 初始化 item 内容
    const itemValue = (initialValues && initialValues[name]) || "";
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value: itemValue,
        rules: rules || [],
        errors: [],
        isValid: true
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取store 对应的 value
  const fieldState = fields[name];
  const fieldValue = fieldState && fieldState.value;
  // 获取store 对应的 errors
  const errors = fieldState && fieldState.errors;
  const hasError = errors && errors.length > 0;
  // 支持自定义校验
  const isRequired = required || rules?.some(
    rule => typeof rule !== "function" && rule.required
  );

  const onValueUpdate = (e: any) => {
    const val = getValueFromEvent(e);
    // 通知外部更新
    onFieldsChange({ [name]: val });
    dispatch({ type: "updateValue", name, value: val });
  };
  const onValueValidate = () => {
    validateField(name);
  };
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps = {
    value: fieldValue,
    onChange: onValueUpdate
  };
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  // 覆盖原有的属性
  overlaidOriginalAttr(controlProps);

  // 2 获取 children 数组的第一个元素
  const child = getFormItemFirstChildren(children) as React.ReactElement;
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  // 在混合时需要将 label, required, error, onErrorClick, border 属性拦截
  const nodeProps = { ...child.props, ...controlProps };

  const returnChildNode = useMemo(()=>React.cloneElement(
    child,
    nodeProps as { value: any; onChange: (e: MouseEvent) => void }
  ), [nodeProps.value]);

  const onErrorClickHandle = useCallback(
    () => onErrorClick(errors?.[0]?.message || ""),
    [errors?.[0]?.message]
  );
  const formItemWrapperProps = {
    label,
    required: isRequired,
    error: hasError,
    isNewLine,
    onErrorClick: onErrorClickHandle,
    border,
    className: formClass + " " + className
  };
  return (
    <FormComponentWrapper {...formItemWrapperProps}>
      {returnChildNode}
    </FormComponentWrapper>
  );
};

FormItem.defaultProps = {
  // valuePropName: 'value',
  // trigger: 'onChange',
  validateTrigger: "onBlur",
  getValueFromEvent: e => e,
  isNewLine: false
};

export default FormItem;
