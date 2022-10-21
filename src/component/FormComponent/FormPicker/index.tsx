import React from 'react';
import { Picker, BaseEventOrig, Text, View } from '@tarojs/components';
import {
  emptyFunction,
  FormC,
  SomeRequired
} from 'src/component/Form/FormItem';
import {
  FormPickerSimpleProps,
  FormPickerMultiSelectorProps,
  FormPickerTimeProps,
  FormPickerDateProps,
  FormPickerRegionProps,
  FormPickerSelectorProps
} from './FormPicker';

const FormPicker: FormC<
  | FormPickerMultiSelectorProps
  | FormPickerSelectorProps
  | FormPickerTimeProps
  | FormPickerDateProps
  | FormPickerRegionProps
  | FormPickerSimpleProps
> = props => {
  const {
    mode = undefined,
    // 范围
    range=[],
    value = '',
    onClick = emptyFunction,
    onChange = emptyFunction,
    fieldNames,
    /** 连字符 */
    hyphens = ' ',
    placeholder,
    ...restProps
  } = props as SomeRequired<FormPickerMultiSelectorProps, 'hyphens'>;

  const _onChange = (e: BaseEventOrig): void => {
    // @ts-ignore
    if (mode === 'selector') {
      const returnValue = range[e.detail.value];
      return onChange(fieldNames ? returnValue[fieldNames.value] : returnValue);
    }
    if (mode === 'multiSelector') {
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
  const showValue = (): string | number | undefined => {
    if (Array.isArray(value)) {
      let result = '';
      let i = 0;
      while (i < value.length) {
        if (fieldNames) {
          result +=
            hyphens +
            // @ts-ignore
            range[i].find(
              (item) =>
                item[fieldNames.value] === value[i]
            )?.[fieldNames.label];
        } else {
          result += hyphens + value[i];
        }
        i++;
      }
      return result;
    }
    /** 修复在h5，picker无法选中0 */
    if (value || value === 0) {
      // @ts-ignore
      if (mode === 'selector' && fieldNames) {
        // @ts-ignore
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
    // @ts-ignore
    if (mode === 'selector') {
      return fieldNames
        ? range.map((item: { [x: string]: any }) => item[fieldNames.label])
        : range;
    }
    if (mode === 'multiSelector') {
      return fieldNames
        ? range.map(ele =>
            ele.map((item: { [x: string]: any }) => item[fieldNames.label])
          )
        : range;
    }
    return range;
  };
  return mode !== undefined ? (
    // @ts-ignore
    <Picker mode={mode} range={getRange()} onChange={_onChange} {...restProps}>
      <View className="at-list">
        <View className="at-list__item">
          <View className="at-list__item-container">
            <View className="at-list__item-content item-content">
              <View className="item-content__info">
                <View className="item-content__info-title">
                  {renderValue ? '' : placeholder}
                </View>
              </View>
            </View>
            <View className="at-list__item-extra item-extra">
              <View className="item-extra__info">{renderValue}</View>
              <View className="item-extra__icon">
                <Text className="at-icon item-extra__icon-arrow at-icon-chevron-right" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Picker>
  ) : (
    <View className="at-list" onClick={onClick}>
      <View className="at-list__item">
        <View className="at-list__item-container">
          <View className="at-list__item-content item-content">
            <View className="item-content__info">
              <View className="item-content__info-title">
                {renderValue ? '' : placeholder}
              </View>
            </View>
          </View>
          <View className="at-list__item-extra item-extra">
            <View className="item-extra__info">{value}</View>
            <View className="item-extra__icon">
              <Text className="at-icon item-extra__icon-arrow at-icon-chevron-right" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
FormPicker.displayName = 'FormItem';
export default FormPicker;
