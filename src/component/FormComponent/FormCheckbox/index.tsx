import React from 'react';
import classNames from 'classnames'
import { FormC } from 'src/component/Form/FormItem';
import { FormCheckboxProps } from './FormCheckbox';
import { Text, View } from '@tarojs/components';

/** 只有一个选项 */
const FormCheckbox: FormC<FormCheckboxProps<any>>  = (props) => {
  const { value: selectedList = [], onChange, customStyle='', className='', options=[] } = props;

  const handleClick = (idx: number): void => {
    const option = options[idx]
    const { disabled, value } = option
    if (disabled) return

    const selectedSet = new Set(selectedList)
    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }
    onChange?.([...selectedSet])
  }
  
  const rootCls = classNames('at-checkbox', className)
  
  return (
    <View className={rootCls} style={customStyle}>
        {options.map((option, idx) => {
          const { value, disabled, label, desc } = option
          const optionCls = classNames('at-checkbox__option', {
            'at-checkbox__option--disabled': disabled,
            'at-checkbox__option--selected': selectedList.includes(value)
          })

          return (
            <View
              className={optionCls}
              key={value}
              onClick={()=>handleClick(idx)}
            >
              <View className='at-checkbox__option-wrap'>
                <View className='at-checkbox__option-cnt'>
                  <View className='at-checkbox__icon-cnt'>
                    <Text className='at-icon at-icon-check'></Text>
                  </View>
                  <View className='at-checkbox__title'>{label}</View>
                </View>
                {desc && <View className='at-checkbox__desc'>{desc}</View>}
              </View>
            </View>
          )
        })}
      </View>
  );
};
FormCheckbox.displayName = 'FormItem';
export default FormCheckbox;
