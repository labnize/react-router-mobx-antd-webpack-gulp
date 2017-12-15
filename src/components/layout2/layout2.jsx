import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import MenuStore from 'store/menustore';
import { observer } from 'mobx-react';
import menus from 'localData/menulist2.json';
import './layout2.less';

const { Header, Content, Footer, Sider } = Layout;
const menuStore = new MenuStore();

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleMenuClick({ item, key, selectedKeys }) {
    console.log(key);
    browserHistory.push(`/${key}`);
  }

  render() {
    const { children, name } = this.props;
    const menuList = menus.list;
    const defaultKey = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'item1';
    // const menuList = menuStore.list;  //菜单通过接口获得
    // const { menuList } = this.state;
    // const firstKey = menuList.list[0].key;
    return (
      <Layout style={{ minHeight: '100vh' }} className="layout" >
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultKey]} onSelect={this.handleMenuClick} >
            {menuList ? menuList.map(item => (
              <Menu.Item key={item.key} >
                <Icon type="user" />
                <span className="nav-text" >{item.name}</span >
              </Menu.Item >
              )
            ) : ''}
          </Menu >
        </Sider >
        <Layout >
          <Header />
          <Content style={{ margin: '24px 16px 0' }} >
            <div className="content-layout" >
              {children}
            </div >
          </Content >
          <Footer style={{ textAlign: 'center' }} >
            July Design ©2017 Created by July
          </Footer >
        </Layout >
      </Layout >
    );
  }
}

PageComponent.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired
};

export default PageComponent;
