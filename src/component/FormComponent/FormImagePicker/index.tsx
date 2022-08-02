import React from 'react';
import { AtImagePicker } from 'taro-ui';
import { FormC } from 'src/component/Form/FormItem';
import { FormImagePickerProps } from './FormImagePicker';

const FormImagePicker: FormC<FormImagePickerProps> = (props) => {

  const { value, ...restProps } = props;

  return <AtImagePicker files={value} {...restProps} />;
};
FormImagePicker.displayName = 'FormItem';
export default FormImagePicker;
