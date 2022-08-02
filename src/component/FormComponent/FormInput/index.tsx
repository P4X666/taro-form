import { AtInput } from 'taro-ui';
import React from 'react';
import { FormC } from 'src/component/Form/FormItem';
import { FormInputProps } from './FormInput';

const FormInput: FormC<FormInputProps> = (props) => {
  return <AtInput {...props} />;
};
FormInput.displayName = 'FormItem';
export default FormInput;
