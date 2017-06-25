import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import menuList from 'data/menulist.json';
// import Util from 'extend/common/util';
import './layout.less';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    let name = this.props.name ? this.props.name : '';
    let menusAll = this.findMenu(JSON.parse(JSON.stringify(menuList.list)), name);

    this.state = {
      menusAll: menusAll
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
    this.handleProfileMenuClick = this.handleProfileMenuClick.bind(this);
  }

  componentDidMount() {
    let layout = $('.layout-content-layout');
    let height = $(window).height() - 176 + 'px';
    layout.css('height', height);
    $(window).resize(function() {
      let height = $(window).height() - 176 + 'px';
      layout.css('height', height);
    });
  }

  findMenu(list, key) {
    let result = [];
    if (key !== '') {
      list.forEach((item) => {
        if (JSON.stringify(item).indexOf(`"${key}"`) !== -1 || JSON.stringify(item).indexOf(`:${key}`) !== -1) {
          if (item.key === key) {
            delete item.sub;
            result.push(item);
          }
          if (item.sub && item.sub.length > 0) {
            const subResult = this.findMenu(item.sub, key);
            delete item.sub;
            result = result.concat(item, subResult);
          }
        }
      });
    }
    return result;
  }

  handleMenuClick({ item, key, selectedKeys }) {
    console.log(key);
    browserHistory.push(`/${key}`);
  }

  handleSubMenuClick({ item, key, selectedKeys }) {
    console.log(key);
    let { menusAll } = this.state;
    let url = `${menusAll[0].key}/${key}`;
    browserHistory.push(`/${url}`);
  }

  handleProfileMenuClick({ item, key, selectedKeys }) {
    if (key === 'exit') {
      // Util.deleteToken();
      browserHistory.push('');
      return;
    }
    browserHistory.push(`/${key}`);
  }

  render() {
    let { children, activeTab } = this.props;
    let [firstMenu, secondMenu, thirdMenu, firstKey, secondKey, thirdKey] = ['', '', '', '', '', ''];
    let { menusAll } = this.state;
    if (menusAll && menusAll.length > 0) {
      if (menusAll.length < 2) {
        firstMenu = menusAll[0].name;
        firstKey = menusAll[0].key;
      } else {
        [firstMenu, secondMenu, thirdMenu, firstKey, secondKey, thirdKey] =
          [menusAll[0].name, menusAll[1].name, menusAll[2].name, menusAll[0].key, menusAll[1].key, menusAll[2].key];
      }
    }
    let subMenus = menuList.list[activeTab - 1].sub;

    return (
      <Layout className="layout" >
        <Header className="header" >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[firstKey]}
            style={{ 'lineHeight': '64px' }}
            onSelect={this.handleMenuClick}
          >
            {menuList.list.map((item) => {
              return (
                <Menu.Item key={item.key} >{item.name}</Menu.Item>
              );
            })}
          </Menu>
        </Header>
        <Content className='layout-content' >
          <Breadcrumb style={{ margin: '12px 0' }} >
            <Breadcrumb.Item>{firstMenu}</Breadcrumb.Item>
            <Breadcrumb.Item>{secondMenu}</Breadcrumb.Item>
            <Breadcrumb.Item>{thirdMenu}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className='layout-content-layout' >
            <Sider width={200} style={{ background: '#fff' }}
                   breakpoint="lg"
                   collapsedWidth="0"
                   onCollapse={(collapsed, type) => {
                     console.log(collapsed, type);
                   }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={[thirdKey]}
                defaultOpenKeys={[secondKey]}
                style={{ height: '100%' }}
                onSelect={this.handleSubMenuClick}
              >
                {
                  subMenus ? subMenus.map((item) => {
                    return (
                      <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.name}</span>} >
                        {
                          item.sub ? item.sub.map((subitem) => {
                            return (
                              <Menu.Item key={subitem.key} >{subitem.name}</Menu.Item>
                            );
                          }) : ''
                        }
                      </SubMenu>
                    );
                  }) : ''
                }
              </Menu>

            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }} >
              {children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }} >
          Copyright ©2017 Labnize - Powered By July V0.0.1
        </Footer>
      </Layout>
    );
  }
}

PageComponent.propTypes = {
  children: PropTypes.element.isRequired,
  activeTab: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default PageComponent;
