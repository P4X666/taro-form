import React from 'react';
import classNames from 'classnames';
import Taro, { pxTransform } from '@tarojs/taro';
import { FormC } from 'src/component/Form/FormItem';
import { AtTextareaProps } from './FormTextarea';
import { CommonEvent } from '@tarojs/components/types/common';
import { Textarea, View } from '@tarojs/components';

type ExtendEvent = {
  target: {
    value: string;
  };
};

function getMaxLength(
  maxLength: number,
  textOverflowForbidden: boolean
): number {
  if (!textOverflowForbidden) {
    return maxLength + 500;
  }
  return maxLength;
}

const ENV = Taro.getEnv();

const FormTextarea: FormC<AtTextareaProps> = props => {
  const {
    customStyle= '',
    className= '',
    value= '',
    cursorSpacing = 100,
    placeholder = '',
    placeholderStyle,
    placeholderClass,
    maxLength = 200,
    count = true,
    disabled = false,
    autoFocus = false,
    focus = false,
    showConfirmBar = false,
    selectionStart = -1,
    selectionEnd = -1,
    fixed = false,
    textOverflowForbidden = true,
    height = '',
    onChange = (): void => { },
    onFocus = (): void => { },
    onBlur = (): void => { },
    onConfirm = (): void => { },
    onLinechange = (): void => { },
  } = props;

  const handleInput = (event: CommonEvent & ExtendEvent): void => {
    onChange(event.target.value, event);
  };

  const handleFocus = (event: CommonEvent): void => {
    onFocus?.(event);
  };

  const handleBlur = (event: CommonEvent): void => {
    onBlur?.(event);
  };

  const handleConfirm = (event: CommonEvent): void => {
    onConfirm?.(event);
  };

  const handleLinechange = (event: CommonEvent): void => {
    onLinechange?.(event);
  };

  const _maxLength = parseInt(maxLength.toString());
  const actualMaxLength = getMaxLength(_maxLength, textOverflowForbidden);
  const textareaStyle = height ? `height:${pxTransform(Number(height))}` : '';
  const rootCls = classNames(
    'at-textarea',
    `at-textarea--${ENV}`,
    {
      'at-textarea--error': _maxLength < value.length
    },
    className
  );
  const placeholderCls = classNames('placeholder', placeholderClass);

  return (
    <View className={rootCls} style={customStyle}>
      <Textarea
        className="at-textarea__textarea"
        style={textareaStyle}
        placeholderStyle={placeholderStyle}
        placeholderClass={placeholderCls}
        cursorSpacing={cursorSpacing}
        value={value}
        maxlength={actualMaxLength}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        focus={focus}
        showConfirmBar={showConfirmBar}
        selectionStart={selectionStart}
        selectionEnd={selectionEnd}
        fixed={fixed}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onConfirm={handleConfirm}
        onLineChange={handleLinechange}
      />
      {count && (
        <View className="at-textarea__counter">
          {value.length}/{_maxLength}
        </View>
      )}
    </View>
  );
};
FormTextarea.displayName = 'FormItem';
export default FormTextarea;
