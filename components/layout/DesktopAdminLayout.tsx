import * as React from 'react';
import { ReactElement, Suspense, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { Typography, Col, Space, Layout, Avatar, Row, Menu, Dropdown, Tabs } from 'antd';
import { AppstoreOutlined, LogoutOutlined, ShopOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import {DashboardOutlined} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import LoaderOverlay from 'shared/components/LoaderOverlay';
import logo from 'shared/assets/logo.png';

// import {access_includes} from 'client/src/services/AccessControl';

import './Layout.scss';
import { AuthConsumer, logout } from '../../contexts/AuthContext';
import { useLocation } from 'react-use';
import {
    ROLES_LIST,
    USER_LIST,
    COMPANY_LIST,
    MASTER_MANAGEMENT,
    CLAIMS, ANALYTICS,
} from '../../constants/RouteConstants';
import { DirectionsBoatOutlined } from '@material-ui/icons';

import dashboard from "../../assets/icons/dashboard.svg"
import building from "../../assets/icons/building.svg"
import increasing from "../../assets/icons/increasing.svg"
import pound from "../../assets/icons/pound.svg"
import user from "../../assets/icons/user.svg"

import active_dashboard from "../../assets/icons/active_dashboard.png"
import active_building from "../../assets/icons/active_building.png"
import active_increasing from "../../assets/icons/active_increasing.png"
import active_pound from "../../assets/icons/active_pound.png"
import active_user from "../../assets/icons/active_user.png"
import AccessControl, {accessIncludes} from "client/src/services/AccessControl";



const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;
const { TabPane } = Tabs;


interface LayoutProps {
    selectedMenu?: string | null;
    onMenuClick?: (route: string) => void;
    children: any;
    hasHeader?: boolean;
    logout?: boolean;
    hasLink?: boolean;
    linkText?: string;
    linkUrl?: string;
}

export default function DesktopAdminLayout({
                                               selectedMenu,
                                               onMenuClick,
                                               children,
                                               hasLink,
                                               linkText,
                                               linkUrl,
                                           }: LayoutProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(COMPANY_LIST as string);
    const location = useLocation();
    const history = useHistory();
    
   
 
    useEffect(() => {
        if (location.pathname)
            setActiveTab(location.pathname);
    }, [location]);

    const handleClick = (e: any) => {
        history.push(e.key);
        return true;
    };
    const menu = (
        <Menu>
            <Menu.Item onClick={()=>history.push('/admin/profile')}>
                <Space><UserOutlined /> <Text>Profile</Text></Space>
            </Menu.Item>
            <AccessControl id = {235}>
                <Menu.Item onClick={()=>history.push(MASTER_MANAGEMENT)}>
                    <Space><UserOutlined /> <Text>Master Management</Text></Space>
                </Menu.Item>
            </AccessControl>
            <Menu.Item onClick={()=>history.push('/admin/roles')}>
                <Space><UserOutlined /> <Text>Manage Roles</Text></Space>
            </Menu.Item>
            <Menu.Item onClick={logout}>
                <Space><LogoutOutlined /> <Text>Logout</Text></Space>
            </Menu.Item>
        </Menu>
    );

    const mainRoutes = [
        {
            title: 'Dashboard',
            route: '/'
        },
        {
            title: 'Analytics',
            route: ANALYTICS
        },
        {
            title: 'Companies',
            route: COMPANY_LIST
        },
        {
            title: 'Users',
            route: USER_LIST
        },
        {
            title: 'Claims',
            route: CLAIMS
        }
    ]

    const headerRoutes = {
      names: [
        'Dashboard',
        'Analytics',
        'Companies',
        'Users',
        'Claims',
      ],
      routes: [
          '/',
          ANALYTICS,
          COMPANY_LIST,
          USER_LIST,
          CLAIMS
      ],
    };

    


    return (
        <Layout
            hasSider={false}
            style={{ minHeight: '100vh' }}
            className={`desktop-layout`}
        >
            <Header style={{ position: 'fixed' }}>
                <Row gutter={20} justify="space-between">
                    <Col>
                        <div className="custom-nav-link">
                            <Link to={'/home'}>
                                <img src={logo} className="logo" />
                            </Link>
                            <div className="logo-text">
                                R&D Tax Credit
                            </div>
                        </div>
                    </Col>
                    <Col flex={'auto'} className={'d-flex align-items-center justify-content-center'}>
                        <Tabs className={'header-tabs'} defaultActiveKey={window.location.pathname}
                              onChange={(key)=>window.location.assign(key)}>
                            <TabPane id="tab1" tab={<span id="span1"> <img id="img1" src={dashboard} alt="loading"/>Dashboard</span>} key={'/'} />
                            <TabPane id="tab2" tab={<span  id="span2"><img id="img2" src={building} alt="loading"/>Analytics</span>} key={ANALYTICS} />
                            {
                                accessIncludes([40, 41, 44, 43, 48]) && <TabPane  id="tab3" tab={<span id="span3"><img id="img3" src={increasing} alt="loading"/> Companies</span>} key={COMPANY_LIST} />
                            }

                            {
                                accessIncludes([34, 35, 36, 38]) && <TabPane  id="tab4" tab={<span  id="span4"><img id="img4" src={user} alt="loading"/>Users</span>} key={USER_LIST} />
                            }

                            {
                                accessIncludes([57, 58, 59, 60, 61]) && <TabPane   id="tab5" tab={<span id="span5"><img id="img5" src={pound} alt="loading"/> Claims</span>} key={CLAIMS} />
                            }


                            {/*{
                                mainRoutes.map((item: any, index: number) => {
                                    return (
                                        <TabPane tab={<span> <img src={getHeaderImage(index)} alt="icon" className="header-icon-img" /> {item.title}</span>} key={item.route} />
                                    )
                                })
                            }*/}
                            {/*{
                                headerRoutes.names.map((name,index)=>{
                                    return (
                                        <TabPane tab={<span> <img src={getHeaderImage(index)} alt="icon" className="header-icon-img" /> {name}</span>} key={headerRoutes.routes[index]} />
                                    )
                                })
                            }*/}
                        </Tabs>
                    </Col>
                    <Col>
                        <AuthConsumer>
                            {({ isAuth, user }) =>
                                (<Dropdown overlay={menu} placement='bottomRight'>
                                    <div className='custom-nav-link account-details'>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="header-user-text">
                                                <span>{user.username}</span>
                                                <span>{user.email}</span>
                                            </div>
                                            <Avatar size={30} icon={<UserOutlined />} style={{marginLeft: '5px'}} />
                                        </div>
                                    </div>
                                </Dropdown>)
                            }
                        </AuthConsumer>
                    </Col>
                </Row>
            </Header>

            <Layout>
                <Content className={'content-layout'}>
                    <Suspense fallback={<LoaderOverlay size='large' loading={true} />}>
                        {children}
                    </Suspense>
                </Content>

            </Layout>
            <div className='footer-wrapper'>
                <Row gutter={20}
                     className={'secondary-footer'}>
                    <Col flex={'auto'} className="text-center">
                        <img src={logo} alt="logo" className={'footer-logo'} />
                        <Text> R&D Tax Credit | &copy; 2021 </Text>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
        ;
}
