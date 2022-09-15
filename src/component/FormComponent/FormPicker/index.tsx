// @ts-nocheck
// AtList 类型“{ children: (string | Element)[]; } ”与类型“IntrinsicAttributes & IntrinsicClassAttributes<Component<AtListProps, any, any>> & Readonly < AtListProps >”不具有相同的属性。
import React from "react";
import { Picker, BaseEventOrig } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import {
  emptyFunction,
  FormC,
  SomeRequired
} from "src/component/Form/FormItem";
import {
  FormPickerSimpleProps,
  FormPickerMultiSelectorProps,
  FormPickerTimeProps,
  FormPickerDateProps,
  FormPickerRegionProps,
  FormPickerSelectorProps
} from "./FormPicker";

const FormPicker: FormC<
  | FormPickerMultiSelectorProps
  | FormPickerTimeProps
  | FormPickerDateProps
  | FormPickerRegionProps
  | FormPickerSelectorProps
  | FormPickerSimpleProps
> = props => {
  const {
    mode = undefined,
    // 范围
    range,
    value = "",
    onClick = emptyFunction,
    onChange,
    fieldNames,
    /** 连字符 */
    hyphens = " ",
    ...restProps
  } = props as SomeRequired<FormPickerMultiSelectorProps, "hyphens">;

  const _onChange = (e: BaseEventOrig): string | number | Array | Object => {
    if (mode === "selector") {
      const returnValue = range[e.detail.value];
      return onChange(fieldNames ? returnValue[fieldNames.value] : returnValue);
    }
    if (mode === "multiSelector") {
      const returnValue0 = range[0][e.detail.value[0]];
      const returnValue1 = range[1][e.detail.value[1]];
      return onChange(
        fieldNames
          ? [returnValue0[fieldNames.value], returnValue1[fieldNames.value]]
          : [returnValue0, returnValue1]
      );
    }
    onChange(e.detail.value);
  };
  /** hyphens 连接符 默认是空字符串 */
  const showValue = () => {
    if (Array.isArray(value)) {
      // multiSelector
      let result = "";
      let i = 0;
      while (i < value.length) {
        if (fieldNames) {
          result +=
            hyphens +
            range[i].find(
              (item: { [x: string]: any }) => item[fieldNames.value] === value[i]
            )?.[fieldNames.label];
        }else{
          result += hyphens + value[i];
        }
        i++;
      }
      return result;
    }
    /** 修复在h5，picker无法选中0 */
    if (value || value === 0) {
      if (mode === "selector" && fieldNames) {
        return range.find(
          (item: { [x: string]: any }) => item[fieldNames.value] === value
        )?.[fieldNames.label];
      }
      return value;
    }
    return undefined;
  };

  const renderValue = showValue();

  const getRange = () => {
    if (mode === "selector") {
      return fieldNames
        ? range.map((item: { [x: string]: any }) => item[fieldNames.label])
        : range;
    }
    if (mode === "multiSelector") {
      return fieldNames
        ? range.map((ele: { [x: string]: any; }[]) => ele.map((item: { [x: string]: any }) => item[fieldNames.label]))
        : range;
    }
    return range;
  };
  return mode !== undefined ? (
    <Picker
      mode={mode}
      range={getRange()}
      onChange={_onChange}
      {...restProps}
    >
      <AtList>
        <AtListItem arrow="right" extraText={renderValue?.toString()} />
      </AtList>
    </Picker>
  ) : (
    <AtList>
      <AtListItem
        arrow="right"
        extraText={value?.toString()}
        onClick={onClick}
      />
    </AtList>
  );
};
FormPicker.displayName = "FormItem";
export default FormPicker;
