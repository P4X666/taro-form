import { View } from '@tarojs/components';
import classNames from 'classnames';
import React, { ReactNode, FC } from 'react';
import './index.less';

export interface FormComponentWrapperProps{
  // 类名
  className?: string,
  // 字段名
  label?: string,
  // 是否必填
  required?: boolean,
  // 是否有错误信息
  error?: boolean,
  // 报错之后的点击事件
  onErrorClick: (event: any) => void,
  // 子组件的下划线
  border: boolean,
  // 子组件是否为上下结构
  isNewLine: boolean,
  // 子节点
  children: ReactNode
}

const FormComponentWrapper: FC<FormComponentWrapperProps> = (props) => {
  const { className, label, required, error, onErrorClick, border, isNewLine} = props;
  const wrapperClass = classNames(className, 'form-component-wrapper', {
    'form-component-wrapper--border': border,
    'form-component-wrapper--new_line': isNewLine,
  });
  const labelClass = classNames('formLabel', {
    'formLabel--error': error,
    'formLabel--require': required
  });
  return <View className={wrapperClass}>
    { label && <View className={labelClass} onClick={onErrorClick}>
      { label }
      { error && <View className='at-icon at-icon-alert-circle'></View> }
    </View>}
    <View className='form-component-content'>
      {props.children}
    </View>
  </View>;
};

FormComponentWrapper.defaultProps = {
  border: true
};

export default React.memo(FormComponentWrapper);
