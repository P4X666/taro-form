import React, { useRef } from 'react';
import classNames from 'classnames';
import { FormC } from 'src/component/Form/FormItem';
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common';
import {
  AtInputProps,
  FocusEventDetail,
  GetInputPropsReturn,
  InputBaseEventDetail,
  InputEventDetail,
  KeyboardHeightEventDetail
} from './FormInput';
import { View, Label, Input, Text } from '@tarojs/components';

function getInputProps(props: AtInputProps): GetInputPropsReturn {
  const actualProps = {
    type: props.type,
    maxlength: props.maxlength,
    disabled: props.disabled,
    password: false
  };

  switch (actualProps.type) {
    case 'phone':
      actualProps.type = 'number';
      actualProps.maxlength = 11;
      break;
    case 'password':
      actualProps.type = 'text';
      actualProps.password = true;
      break;
    default:
      break;
  }
  if (!props.disabled && !props.editable) {
    actualProps.disabled = true;
  }
  return actualProps as GetInputPropsReturn;
}

const FormInput: FormC<AtInputProps> = (
  props = {
    name: '',
    className: '',
    customStyle: '',
    value: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    title: '',
    cursorSpacing: 50,
    confirmType: 'done',
    cursor: 0,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    maxlength: 140,
    type: 'text',
    disabled: false,
    border: true,
    editable: true,
    error: false,
    clear: false,
    autoFocus: false,
    focus: false,
    required: false,
    onChange: (
      _value: string | number,
      _event: BaseEventOrig<InputEventDetail>
    ) => {},
    onFocus: (
      _value: string | number,
      _event: BaseEventOrig<FocusEventDetail>
    ) => {},
    onBlur: (
      _value: string | number,
      _event: BaseEventOrig<InputBaseEventDetail>
    ) => {},
    onConfirm: (
      _value: string | number,
      _event: BaseEventOrig<InputBaseEventDetail>
    ) => {},
    onClick: (_event: ITouchEvent) => {},
    onKeyboardHeightChange: (
      _event: BaseEventOrig<KeyboardHeightEventDetail>
    ) => {}
  }
) => {
  const inputClearing = useRef(false);

  const handleInput = (event: BaseEventOrig<InputEventDetail>): void =>
    props.onChange!(event.detail.value, event);
  const handleFocus = (event: BaseEventOrig<FocusEventDetail>): void =>
    props.onFocus?.(event.detail.value, event);
  const handleBlur = (event: BaseEventOrig<InputBaseEventDetail>): void => {
    props.onBlur?.(event.detail.value, event);
    if (event.type === 'blur' && !inputClearing.current) {
      props.onChange!(
        event.detail.value,
        event as BaseEventOrig<InputEventDetail>
      );
    }
    // 还原状态
    inputClearing.current = false;
  };
  const handleConfirm = (event: BaseEventOrig<InputBaseEventDetail>): void =>
    props.onConfirm?.(event.detail.value, event);

  const handleClick = (event: ITouchEvent): void => {
    if (props.editable) {
      props.onClick?.(event);
    }
  };
  const handleClearValue = (event: ITouchEvent): void => {
    inputClearing.current = true;
    props.onChange!('', event);
  };
  const handleKeyboardHeightChange = (
    event: BaseEventOrig<KeyboardHeightEventDetail>
  ): void => {
    props.onKeyboardHeightChange?.(event);
  };

  const inputProps = getInputProps(props);
  // { type, maxlength, disabled, password }
  const rootCls = classNames(
    'at-input',
    {
      'at-input--without-border': !props.border
    },
    props.className
  );
  const containerCls = classNames('at-input__container', {
    // 'at-input--error': props.error,
    'at-input--disabled': inputProps.disabled
  });
  const overlayCls = classNames('at-input__overlay', {
    'at-input__overlay--hidden': !inputProps.disabled
  });
  const placeholderCls = classNames('placeholder', props.placeholderClass);

  const id = props.name && { id: props.name };

  return (
    <View className={rootCls} style={props.customStyle}>
      <View className={containerCls}>
        <View className={overlayCls} onClick={handleClick}></View>
        {props.title && (
          <Label
            className={`at-input__title ${props.required &&
              'at-input__title--required'}`}
            for={props.name}
          >
            {props.title}
          </Label>
        )}
        <Input
          className="at-input__input"
          {...id}
          name={props.name}
          type={inputProps.type}
          password={inputProps.password}
          placeholderStyle={props.placeholderStyle}
          placeholderClass={placeholderCls}
          placeholder={props.placeholder}
          cursorSpacing={props.cursorSpacing}
          maxlength={inputProps.maxlength}
          autoFocus={props.autoFocus}
          focus={props.focus}
          value={props.value}
          confirmType={props.confirmType}
          cursor={props.cursor}
          selectionStart={props.selectionStart}
          selectionEnd={props.selectionEnd}
          adjustPosition={props.adjustPosition}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={handleConfirm}
          onKeyboardHeightChange={handleKeyboardHeightChange}
        />
        {props.clear && props.value && (
          <View className="at-input__icon" onTouchEnd={handleClearValue}>
            <Text className="at-icon at-icon-close-circle at-input__icon-close"></Text>
          </View>
        )}
        <View className="at-input__children">{props.children}</View>
      </View>
    </View>
  );
};
FormInput.displayName = 'FormItem';
export default FormInput;
