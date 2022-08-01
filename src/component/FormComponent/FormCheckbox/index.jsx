import { AtCheckbox } from 'taro-ui';

/** 只有一个选项 */
const FormCheckbox = (props) => {
  const { value, ...restProps } = props;
  return <AtCheckbox selectedList={value} {...restProps} />;
};
FormCheckbox.type = 'FormItem';
export default FormCheckbox;
