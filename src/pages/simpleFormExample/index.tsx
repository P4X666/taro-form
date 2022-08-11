import { MutableRefObject, useRef } from 'react';
import { View, Button } from '@tarojs/components';
import Form from 'src/component/Form';
import { AtDivider } from 'taro-ui';
import { FormCheckbox, FormInput } from 'src/component/FormComponent';
import styles from './index.module.less';
import React from 'react';

const SimpleFormExample = () => {

  const formRef: MutableRefObject<any> = useRef(null);
  const custFormRef: MutableRefObject<any> = useRef(null);

  const onSubmit = () => {
    formRef.current.validateAllFields().then(({ isValid, errors, values }) => {
      if (isValid) {
        console.log('验证通过，表单的值为：', values);
      } else {
        console.log('验证未通过，表单的值为：', values);
        console.log('错误信息为：', errors);
      }
    });
  };
  const onCustSubmit = () => {
    custFormRef.current.validateAllFields().then(({ isValid, errors, values }) => {
      if (isValid) {
        console.log('验证通过，表单的值为：', values);
      } else {
        console.log('验证未通过，表单的值为：', values);
        console.log('错误信息为：', errors);
      }
    });
  };
  const onCustReset = () => {
    custFormRef.current.resetFields();
  };

  const confirmRules = [
    ({ getFieldValue }) => ({
      asyncValidator(rule, value) {
        console.log('the value', getFieldValue('password'));
        console.log(value);
        if (value !== getFieldValue('password')) {
          return Promise.reject('新旧密码不匹配');
        }
        return Promise.resolve();
      }
    })
  ];

  const checkboxOption = [ {
    value: 'list1',
    label: '',
  } ];

  return (
    <View className={styles.wrapper}>
      <View className={styles.box}>
        <Form ref={formRef} initialValues={{ username: '用户名1' }}>
          <Form.Item label="用户名" name="username" rules={[ { type: 'string', required: true, message: '用户名必填' } ]}>
            <FormInput type="phone" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[ { type: 'string', required: true, min: 3, max: 8, message: '密码长度必须在3-8个字符之间' } ]}>
            <FormInput type="password" />
          </Form.Item>
          <Form.Item label="重复密码" name="confirmPwd" rules={confirmRules}>
            <FormInput type="password" />
          </Form.Item>
        </Form>
        <Button form-type="submit" onClick={onSubmit} className={styles.submit}>登录</Button>
        <AtDivider content="分割线" />
        <Form ref={custFormRef} initialValues={{ username: '用户名2' }}>
          {
            ({isValid, isSubmitting, errors}) => {
              return (
                <>
                  <View className={styles.formItem}>
                    <Form.Item isNewLine label="用户名" name="username" rules={[ { type: 'string', required: true, message: '用户名必填' } ]}>
                      <FormInput />
                    </Form.Item>
                  </View>
                  <View className={styles.formItem}>
                    <Form.Item isNewLine label="密码" name="password" rules={[ { type: 'string', required: true, min: 3, max: 8, message: '密码长度必须在3-8个字符之间' } ]}>
                      <FormInput type="password" />
                    </Form.Item>
                  </View>
                  <View className={styles.formItem}>
                    <Form.Item
                      className={styles.agreementWrap}
                      name="agreement"
                      rules={[ { type: 'array', len: 1, message: '请同意协议' } ]}
                    >
                      <FormCheckbox options={checkboxOption} />
                    </Form.Item>
                    <View className={styles.agreementText}>注册即代表你同意<View className={styles.agreement}>用户协议</View></View>
                  </View>
                  <Button loading={isSubmitting} onClick={onCustSubmit} className={styles.submit}>
                    登录
                  </Button>
                  <Button onClick={onCustReset} className={styles.submit}>重置</Button>
                </>
              );
            }}
        </Form>
      </View>
    </View>
  );
};

export default SimpleFormExample;
