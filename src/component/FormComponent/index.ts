/**
 * 所有的 form 子组件都必须有五个入参
 * value   组件的值
 * label   组件的描述
 * hasError 组件是否报错
 * onErrorClick 点击报错的 label 时，弹窗显示报错信息
 * isNewLine 组件ui是否为上下结构
 * 
 * 将form组件的报错信息设计在 label 上，
 * 当组件报错时， label 颜色变红，同时 label 右侧出现红色感叹号提示
 * 
 * 
 * 之所以将非填写类的都放在 picker 中，而不是 input 中，
 * 是因为 picker 的主要作用就是选择，所以类似于获取所在坐标之类的操作都统一放在 picker 中
 * 
 * 目前只有 picker 和 checkbox switch是做了特殊处理
 * checkbox switch 只修改了 value
 * 
 * 之所以没做 FormCheckboxGroup ，是因为 目前没在业务中发现有此类场景，该组件的功能和picker重合，切基本上都被 picker 很好的替代
 * 
 */

import FormInput from './FormInput';
import FormPicker from './FormPicker';
import FormRate from './FormRate';
import FormSwitch from './FormSwitch';
import FormImagePicker from './FormImagePicker';
import FormCheckbox from './FormCheckbox';
import FormTextarea from './FormTextarea';

export {
  FormInput,
  FormPicker,
  FormRate,
  FormSwitch,
  FormImagePicker,
  FormCheckbox,
  FormTextarea
};
