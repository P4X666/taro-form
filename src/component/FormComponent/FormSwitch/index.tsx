import React from 'react';
import { AtSwitch } from 'taro-ui';
import { FormC } from 'src/component/Form/FormItem';
import { FormSwitchProps } from './FormSwitch';

const FormSwitch: FormC<FormSwitchProps> = (props) => {
  const { value, ...restProps } = props;
  return <AtSwitch checked={!!value} {...restProps} />;
};
FormSwitch.displayName = 'FormItem';
export default FormSwitch;
