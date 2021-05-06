import React from 'react';
import { Layout, Menu } from 'antd';
import { SearchOutlined, LoginOutlined, createFromIconfontCN } from '@ant-design/icons'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import * as api from '../services/login';



const { Header } = Layout;
const HeaderComponent = () => {
  const location = useLocation();
  // const history = useHistory();
  const pathname = location.pathname;
  // const infoUser = api.decodeTokenFormStorage();

  // const logout = () => {
  //   if (infoUser !== null) {
  //     api.removeTokenStorage();
  //     history.push('/login');
  //   }
  // }
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

      <div className="logo" style={{ size: '8' }}>

      </div>

       
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname} style={{ fontFamily: 'Verdana', fontWeight: 'bold' }}>
          <Menu.Item key="/home">
            <NavLink to="/home">Trang chủ</NavLink>
          </Menu.Item>
          <Menu.Item key="/new-film">
            <NavLink to="/new-film">Phim mới</NavLink>
          </Menu.Item>
          <Menu.Item key="/action-film">
            <NavLink to="/new-film">Phim Hành Động</NavLink>
          </Menu.Item>
          <Menu.Item key="/romantic-film">
            <NavLink to="/new-film">Phim Tình Cảm</NavLink>
          </Menu.Item>
          <Menu.Item key="/horror-film">
            <NavLink to="/new-film">Phim Kinh Dị</NavLink>
          </Menu.Item>
          <Menu.Item key="/search-film">
            <NavLink to="/search-film"><SearchOutlined style={{ fontSize: '20px' }} /></NavLink>
          </Menu.Item>
          {/* {infoUser === null && (
            <Menu.Item key="/login">
              <NavLink to="/login"><LoginOutlined style={{ fontSize: '20px' }} /></NavLink>
            </Menu.Item>
          )}

          <Menu.Item>
            <strong>
              {infoUser !== null ? `
            Hi: ${infoUser.username}` : null}
            </strong>
          </Menu.Item>
          {infoUser !== null && (
            <Menu.Item>
              <span onClick={() => logout()}><IconFont type="icon-tuichu" style={{ fontSize: '20px' }} /></span>
            </Menu.Item>
          )} */}

        </Menu>
          
        
        

    </Header>
  )
}
export default React.memo(HeaderComponent);