import React, { Component } from 'react';
import { Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class PageComponent extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal'
    };
  }

  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    } : null;
    return (
      <div >
        <Form layout={formLayout} >
          <FormItem
            label="用户类型"
            {...formItemLayout}
          >
            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange} >
              <Radio.Button value="普通用户" >普通用户</Radio.Button >
              <Radio.Button value="管理员" >管理员</Radio.Button >
            </Radio.Group >
          </FormItem >
          <FormItem
            label="用户名"
            {...formItemLayout}
          >
            <Input placeholder="请填写用户名" />
          </FormItem >
          <FormItem
            label="用户描述"
            {...formItemLayout}
          >
            <TextArea rows={4} />
          </FormItem >
        </Form >
      </div >
    );
  }
}

export default PageComponent;
