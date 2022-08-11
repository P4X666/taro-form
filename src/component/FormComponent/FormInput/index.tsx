import { AtInput } from 'taro-ui';
import React from 'react';
import { emptyFunction, FormC } from 'src/component/Form/FormItem';
import { FormInputProps } from './FormInput';

const FormInput: FormC<FormInputProps> = (props) => {
  const { name='', onChange, ...restProps } = props;
  return (
    <AtInput name={name} onChange={onChange || emptyFunction} {...restProps} />
  );
};
FormInput.displayName = 'FormItem';
export default FormInput;
