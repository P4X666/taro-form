
import { ComponentClass, ReactNode } from 'react';
import { AtImagePickerProps, File } from 'taro-ui/types/image-picker';

export interface FormImagePickerProps extends Omit<AtImagePickerProps, 'files' | 'value' | 'onChange'> {
  value?: File[],
  /**
   * files 值发生变化触发的回调函数, operationType 操作类型有添加，移除，如果是移除操作，则第三个参数代表的是移除图片的索引
   */
  onChange?: (files: File[], operationType: 'add' | 'remove', index?: number) => void,
  children?: ReactNode
}

declare const FormImagePicker: ComponentClass<FormImagePickerProps>

export default FormImagePicker