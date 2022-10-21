import React from 'react';
import classNames from 'classnames';

import { FormC } from 'src/component/Form/FormItem';
import { View, Text } from '@tarojs/components';
import { pxTransform } from '@tarojs/taro';
import { AtRateProps } from './FormRate';

const FormRate: FormC<AtRateProps> = props => {
  const {
    customStyle = '',
    className = '',
    size = 0,
    value = 0,
    max = 5,
    margin = 5,
    onChange = (_index: number) => {}
  } = props;

  const iconStyle = {
    marginRight: pxTransform(margin)
  };
  const starIconStyle = {
    fontSize: size ? `${size}px` : ''
  };
  // 生成星星颜色 className 数组，方便在jsx中直接map
  const classNameArr: string[] = [];
  const floorValue = Math.floor(value);
  const ceilValue = Math.ceil(value);
  for (let i = 0; i < max; i++) {
    if (floorValue > i) {
      classNameArr.push('at-rate__icon at-rate__icon--on');
    } else if (ceilValue - 1 === i) {
      classNameArr.push('at-rate__icon at-rate__icon--half');
    } else {
      classNameArr.push('at-rate__icon at-rate__icon--off');
    }
  }
  const handleClick = (index: number): void => {
    onChange(index)
  }
  return (
    <View className={classNames('at-rate', className)} style={customStyle}>
      {classNameArr.map((cls, i) => (
        <View
          className={cls}
          key={`at-rate-star-${i}`}
          style={iconStyle}
          onClick={() => handleClick(i + 1)}
        >
          <Text className="at-icon at-icon-star-2" style={starIconStyle}></Text>
          <View className="at-rate__left">
            <Text
              className="at-icon at-icon-star-2"
              style={starIconStyle}
            ></Text>
          </View>
        </View>
      ))}
    </View>
  );
};
FormRate.displayName = 'FormItem';
export default FormRate;
