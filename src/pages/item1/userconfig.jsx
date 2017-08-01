import React, { Component } from 'react';
import { Form, Input, Radio, Button } from 'antd';
// import modal from 'components/modal/modal';
import Ajax from 'util/ajax';
import PropTypes from 'prop-types';
import './userConfig.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const url = 'claa/tablelist';

class PageComponent extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal'
    };
    this.cancelClickHandler = this.cancelClickHandler.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const that = this;
        const param = {
          loadingFlag: true,
          url,
          method: 'POST',
          data: {
            username: values.username,
            rolename: values.rolename,
            userDesc: values.userDesc
          },
          successFn() {
            that.props.onTrigger('visible', false);
            that.props.onTrigger('doQuery');
          }
        };
        Ajax.fetch(param);
      }
    });
  };

  cancelClickHandler() {
    this.props.onTrigger('visible', false);
  }

  render() {
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div >
        <Form onSubmit={this.handleSubmit} layout={formLayout} className="userConfig" >
          <FormItem
            label="用户类型"
            {...formItemLayout}
          >
            {getFieldDecorator('rolename', {
              rules: [{ required: true, message: '请选择用户类型!' }]
            })(
              <Radio.Group>
                <Radio.Button value="普通用户" >普通用户</Radio.Button >
                <Radio.Button value="管理员" >管理员</Radio.Button >
              </Radio.Group >
            )}
          </FormItem >
          <FormItem
            label="用户名"
            {...formItemLayout}
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(
              <Input placeholder="请填写用户名" />
            )}
          </FormItem >
          <FormItem
            label="用户描述"
            {...formItemLayout}
          >
            {getFieldDecorator('userDesc', {
              rules: [{ required: true, message: '请输入用户描述!' }]
            })(
              <TextArea rows={4} />
            )}
          </FormItem >
          <FormItem
            wrapperCol={{ span: 24 }}
            className="footer"
          >
            <Button type="primary" htmlType="submit" >
              确定
            </Button >
            <Button style={{ marginLeft: 8 }} onClick={this.cancelClickHandler} >
              取消
            </Button >
          </FormItem >
        </Form >
      </div >
    );
  }
}

PageComponent.propTypes = {
  onTrigger: PropTypes.func.isRequired
};

const WrappedNormalLoginForm = Form.create()(PageComponent);
export default WrappedNormalLoginForm;
