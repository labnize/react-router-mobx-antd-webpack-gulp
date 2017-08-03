import React, { Component } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import Ajax from 'util/ajax';
import PropTypes from 'prop-types';
import modal from 'components/modal/modal';

import './userConfig.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const url = 'claa/tablelist';

class PageComponent extends Component {
  static cancelClickHandler() {
    modal.closeModel();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const that = this;
        const param = {
          loadingFlag: false,
          url,
          method: 'POST',
          data: {
            username: values.username,
            rolename: values.rolename,
            userDesc: values.userDesc
          },
          successFn() {
            that.props.onTrigger();
          }
        };
        Ajax.fetch(param);
      }
    });
  };

  render() {
    const { param } = this.props;
    const rolename = param.rolename ? param.rolename : '';
    const username = param.username ? param.username : '';
    const desc = param.desc ? param.desc : '';

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div >
        <Form onSubmit={this.handleSubmit} layout="horizontal" className="userConfig" >
          <FormItem
            label="用户类型"
            {...formItemLayout}
          >
            {getFieldDecorator('rolename', {
              initialValue: rolename,
              rules: [{ required: true, message: '请选择用户类型!' }]
            })(
              <Radio.Group >
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
              initialValue: username,
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
              initialValue: desc,
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
            <Button style={{ marginLeft: 8 }} onClick={PageComponent.cancelClickHandler} >
              取消
            </Button >
          </FormItem >
        </Form >
      </div >
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

const WrappedNormalLoginForm = Form.create()(PageComponent);
export default WrappedNormalLoginForm;
