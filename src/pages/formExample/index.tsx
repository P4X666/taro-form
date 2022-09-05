import React, { MutableRefObject, useRef } from "react";

import { View, Button } from "@tarojs/components";
import Form from "src/component/Form";
import Taro from "@tarojs/taro";
import { gradeList, multiSelector } from "src/utils/constent";
import {
  FormImagePicker,
  FormInput,
  FormPicker,
  FormRate,
  FormSwitch
} from "src/component/FormComponent";
import { FormInstance } from "src/component/Form/types/Form";
import styles from "./index.module.less";

const FormExample = () => {
  const formRef = useRef() as MutableRefObject<FormInstance>;

  const onSubmit = () => {
    formRef.current.validateAllFields().then(({ isValid, errors, values }) => {
      if (isValid) {
        console.log("验证通过，表单的值为：", values);
      } else {
        console.log("验证未通过，表单的值为：", values);
        console.log("错误信息为：", errors);
      }
    });
  };

  const chooseLocation = () => {
    let params = {};
    Taro.chooseLocation({
      ...params,
      success: res => {
        console.log(res);
        formRef.current.setFieldValue("address", res.address);
      }
    });
  };
  const onReset = () => {
    formRef.current.resetFields();
  };
  return (
    <View className={styles.wrapper}>
      <View className={styles.box}>
        <Form
          ref={formRef}
          initialValues={{
            username: "用户名1",
            singleSelect: gradeList[0],
            multiSelect: [multiSelector[0][0], multiSelector[1][0]],
            dateSelect: "2022-09-05"
          }}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[
              { type: "string", required: true, message: "请输入用户名" }
            ]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            label="曾用名"
            name="oldUserName"
            rules={[
              { type: "string", required: true, message: "请输入曾用名" }
            ]}
          >
            <FormInput>
              <View className="at-icon at-icon-chevron-right"></View>
            </FormInput>
          </Form.Item>
          <Form.Item
            label="居住地址"
            name="address"
            rules={[
              { type: "string", required: true, message: "请选择居住地址" }
            ]}
          >
            <FormPicker onClick={chooseLocation}></FormPicker>
          </Form.Item>
          <Form.Item
            label="单个选项"
            name="singleSelect"
            rules={[
              { type: "string", required: true, message: "请选择单个选项" }
            ]}
          >
            <FormPicker mode="selector" range={gradeList}></FormPicker>
          </Form.Item>

          <Form.Item
            label="多个选项"
            name="multiSelect"
            rules={[
              { type: "string", required: true, message: "请选择多个选项" }
            ]}
          >
            <FormPicker mode="multiSelector" range={multiSelector}></FormPicker>
          </Form.Item>
          <Form.Item
            label="选择日期"
            name="dateSelect"
            rules={[{ type: "string", required: true, message: "请选择日期" }]}
          >
            <FormPicker mode="date"></FormPicker>
          </Form.Item>
          <Form.Item
            label="选择时间"
            name="timeSelect"
            rules={[{ type: "string", required: true, message: "请选择日期" }]}
          >
            <FormPicker mode="time"></FormPicker>
          </Form.Item>
          <Form.Item
            label="评分组件"
            name="rate"
            rules={[{ type: "number", required: true, message: "请选择评分" }]}
          >
            <FormRate></FormRate>
          </Form.Item>

          <Form.Item
            label="开关组件"
            name="switch"
            rules={[{ type: "number", required: true, message: "请选择评分" }]}
          >
            <FormSwitch />
          </Form.Item>
          <Form.Item
            label="图片选择组件"
            name="imagePicker"
            rules={[{ type: "number", required: true, message: "请选择评分" }]}
            isNewLine
          >
            <FormImagePicker />
            {/* <Button type="primary">上传</Button> */}
            {/* </FormImagePicker> */}
          </Form.Item>
        </Form>
        <Button form-type="submit" onClick={onSubmit} className={styles.submit}>
          提交
        </Button>
        <Button onClick={onReset} className={styles.submit}>
          重置
        </Button>
      </View>
    </View>
  );
};

export default FormExample;
