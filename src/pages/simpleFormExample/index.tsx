import React, { MutableRefObject, useEffect, useRef } from 'react';
import { View, Button } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import Form, { FormCheckbox, FormInput, FormInstance } from 'fe-taro-form';
import styles from './index.module.less';
import { useReady } from '@tarojs/taro';

const SimpleFormExample = () => {
  const formRef = useRef() as MutableRefObject<FormInstance>;
  const custFormRef = useRef() as MutableRefObject<FormInstance>;

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
    custFormRef.current
      .validateAllFields()
      .then(({ isValid, errors, values }) => {
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

  const checkboxOption = [
    {
      value: true,
      label: ''
    }
  ];

  const onFieldsChange = (changedValues: Record<string, any>) => {
    console.log(changedValues);
  };

  useReady(() => {
    Promise.resolve().then(() => {
      formRef.current.setFieldValue('password', '123');
    });
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      formRef.current.setFieldsValue({
        username: 'hello1'
      });
    });
  }, []);

  return (
    <View className={styles.wrapper}>
      <View className={styles.box}>
        <Form ref={formRef} initialValues={{ username: '用户名1' }}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ type: 'string', required: true, message: '用户名必填' }]}
          >
            <FormInput type="phone" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                type: 'string',
                required: true,
                min: 3,
                max: 8,
                message: '密码长度必须在3-8个字符之间'
              }
            ]}
          >
            <FormInput type="password" />
          </Form.Item>
          <Form.Item label="重复密码" name="confirmPwd" rules={confirmRules}>
            <FormInput type="password" />
          </Form.Item>
        </Form>
        <Button form-type="submit" onClick={onSubmit} className={styles.submit}>
          登录
        </Button>
        <AtDivider content="分割线" />
        <Form
          ref={custFormRef}
          initialValues={{ username: '用户名2' }}
          onFieldsChange={onFieldsChange}
        >
          {({ isValid, isSubmitting, errors }, fields) => {
            return (
              <>
                <View className={styles.formItem}>
                  <Form.Item
                    isNewLine
                    label="用户名"
                    name="username"
                    rules={[
                      { type: 'string', required: true, message: '用户名必填' }
                    ]}
                  >
                    <FormInput />
                  </Form.Item>
                </View>
                <View className={styles.formItem}>
                  <Form.Item
                    isNewLine
                    label="密码"
                    name="password"
                    rules={[
                      {
                        type: 'string',
                        required: true,
                        min: 3,
                        max: 8,
                        message: '密码长度必须在3-8个字符之间'
                      }
                    ]}
                  >
                    <FormInput type="password" />
                  </Form.Item>
                </View>
                <View className={styles.formItem}>
                  <Form.Item
                    className={styles.agreementWrap}
                    name="agreement"
                    rules={[{ type: 'array', len: 1, message: '请同意协议' }]}
                    border={false}
                  >
                    <FormCheckbox options={checkboxOption} />
                  </Form.Item>
                  <View className={styles.agreementText}>
                    注册即代表你同意
                    <View className={styles.agreement}>用户协议</View>
                  </View>
                </View>
                {fields.agreement?.length === 1 && (
                  <View className={styles.formItem}>
                    <Form.Item
                      isNewLine
                      label="验证码"
                      name="code"
                      rules={[
                        {
                          type: 'string',
                          required: true,
                          len: 6,
                          message: '验证码长度有误'
                        }
                      ]}
                    >
                      <FormInput />
                    </Form.Item>
                  </View>
                )}
                <Button
                  loading={isSubmitting}
                  onClick={onCustSubmit}
                  className={styles.submit}
                >
                  登录
                </Button>
                <Button onClick={onCustReset} className={styles.submit}>
                  重置
                </Button>
              </>
            );
          }}
        </Form>
      </View>
    </View>
  );
};

export default SimpleFormExample;
