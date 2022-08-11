import React from 'react';
import { AtCheckbox } from 'taro-ui';
import { emptyFunction, FormC } from 'src/component/Form/FormItem';
import { FormCheckboxProps } from './FormCheckbox';

/** 只有一个选项 */
const FormCheckbox: FormC<FormCheckboxProps<any>>  = (props) => {
  const { value, onChange, ...restProps } = props;
  return (
    <AtCheckbox
      selectedList={value || []}
      onChange={onChange || emptyFunction}
      {...restProps}
    />
  );
};
FormCheckbox.displayName = 'FormItem';
export default FormCheckbox;
