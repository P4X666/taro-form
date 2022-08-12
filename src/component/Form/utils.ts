import Taro from '@tarojs/taro';
import React, { ReactNode } from 'react';

/** formItem 限定有且只有一个子组件，否则给出错误提示 */
export const getFormItemFirstChildren = (children: ReactNode) => {
  const childList = React.Children.toArray(children);
  // 没有子组件
  if (childList.length === 0) {
    console.error('必须提供一个 form 子组件');
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn('只支持一个子组件，其余会被忽略');
  }
  // 不是 Form 的子组件
  // if (!childList[0].type?.type === 'FormItem') {
  //   console.error('子组件必须是 FormItem');
  // }
  return childList[0];
};

export const _onErrorClick = (errMessage: string) => {
  if (!errMessage) return;
  Taro.showToast({
    title: errMessage,
    icon: 'none',
    duration: 1500,
    mask: true
  });
};
/** targetAttr 的属性覆盖 source 的属性*/
const addNonRequiredAttr = (source: Record<string, any>, targetAttr: Record<string, any> []) => {
  for (const iterator of targetAttr) {
    if (iterator.value) {
      source[iterator.key] = iterator.value;
    }
  }
};
// 覆盖原有的ui属性，在 FormComponentWrapper 中统一处理
export const overlaidOriginalAttr = (controlProps: Record<string, any>) => {
  const targetAttr = [
    {key: 'label', value: ''},
    {key: 'required', value: false},
    {key: 'error', value: false},
    {key: 'onErrorClick', value: () => {}},
  ];
  addNonRequiredAttr(controlProps, targetAttr);
};

export const isObject = (data: any) => Object.prototype.toString.call(data) === "[object Object]";
