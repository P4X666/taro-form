import React from 'react';
import classNames from 'classnames';
import { FormC } from 'src/component/Form/FormItem';
import { FormSwitchProps } from './FormSwitch';
import { Switch, View } from '@tarojs/components';
import { CommonEvent } from '@tarojs/components/types/common';

const FormSwitch: FormC<FormSwitchProps> = props => {
  const {
    value = false,
    onChange = (_data: boolean) => {},
    customStyle = '',
    className = '',
    disabled = false,
    title = '',
    color = '#6190e8'
  } = props;
  const rootCls = classNames('at-switch', className);
  const containerCls = classNames('at-switch__container', {
    'at-switch--disabled': disabled
  });
  const handleChange = (event: CommonEvent): void => {
    const state =
      typeof event.detail.value === 'undefined'
        ? event.detail.checked
        : event.detail.value;
    onChange?.(state);
  };
  return (
    <View className={rootCls} style={customStyle}>
      <View className="at-switch__title">{title}</View>
      <View className={containerCls}>
        <View className="at-switch__mask"></View>
        <Switch
          className="at-switch__switch"
          checked={!!value}
          color={color}
          onChange={handleChange}
        />
      </View>
    </View>
  );
};
FormSwitch.displayName = 'FormItem';
export default FormSwitch;
