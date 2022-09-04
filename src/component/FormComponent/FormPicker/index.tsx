// @ts-nocheck
// AtList 类型“{ children: (string | Element)[]; } ”与类型“IntrinsicAttributes & IntrinsicClassAttributes<Component<AtListProps, any, any>> & Readonly < AtListProps >”不具有相同的属性。
import React from "react";
import { Picker, BaseEventOrig } from "@tarojs/components";
import { useMemo } from "react";
import { AtList, AtListItem } from "taro-ui";
import { FormC, SomeRequired } from "src/component/Form/FormItem";
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
    onClick,
    onChange,
    rangeKey,
    /** 连字符 */
    hyphens = " ",
    ...restProps
  } = props as SomeRequired<FormPickerMultiSelectorProps, "hyphens">;

  const fullWidth = { flex: 1 };

  const _onChange = (e: BaseEventOrig): string | number | Array | Object => {
    onChange?.(e.detail.value);
  };
  /** hyphens 连接符 默认是空字符串 */
  const showValue = () => {
    if (Array.isArray(value)) {
      let result = "";
      let i = 0;
      while (i < value.length) {
        result += hyphens + range[i][value[i] as string];
        i++;
      }
      return result;
    }
    /** 修复在h5，picker无法选中第一个 */
    if (value || value === 0) {
      if (["date", "time"].includes(mode) || !mode) {
        return value;
      }
      const val = range[value];
      return rangeKey ? val[rangeKey] : val;
    }
    return undefined;
  };

  const renderValue = useMemo(() => {
    return showValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, value]);
  return mode !== undefined ? (
    <Picker
      mode={mode}
      range={range}
      style={fullWidth}
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
