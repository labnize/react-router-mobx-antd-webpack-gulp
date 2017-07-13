import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import menuList from 'data/menulist2.json';
import './layout2.less';

const { Header, Content, Footer, Sider } = Layout;

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const layout = $('.content-layout');
    const height = `${$(window).height() - 93}px`;
    layout.css('height', height);
    $(window).resize(() => {
      const height = `${$(window).height() - 93}px`;
      layout.css('height', height);
    });
  }

  handleMenuClick({ item, key, selectedKeys }) {
    console.log(key);
    browserHistory.push(`/${key}`);
  }

  render() {
    const { children, name } = this.props;
    // const firstKey = menuList.list[0].key;
    return (
      <Layout className="layout">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[name]} onSelect={this.handleMenuClick}>
            {menuList ? menuList.list.map(item => (
              <Menu.Item key={item.key}>
                <Icon type="user" />
                <span className="nav-text">{item.name}</span>
              </Menu.Item>
              )) : ''}
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="content-layout" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            July Design ©2016 Created by July
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

PageComponent.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired
};

export default PageComponent;
