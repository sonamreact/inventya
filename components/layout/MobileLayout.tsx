import * as React from 'react';
import {
    LogoutOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    ArrowLeftOutlined,
    UserOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { ReactElement, Suspense, useState } from 'react';

import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoaderOverlay from 'shared/components/LoaderOverlay';

import './Layout.scss';

const { Header, Sider, Content } = Layout;

interface MenuItem {
    route: string;
    icon: ReactElement;
    label: string;
    warning?: ReactElement;
    daysBeforeQBExpiration?: number;
}

interface LayoutProps {
    topMenuItems?: MenuItem[];
    bottomMenuItems?: MenuItem[];
    selectedMenu?: string | null;
    onMenuClick?: (route: string) => void;
    children: any;
    hasHeader?: boolean;
    logout?: boolean;
    hasLink?: boolean;
    linkText?: string;
    linkUrl?: string;
}

export default function MobileLayout({
                                          topMenuItems,
                                          bottomMenuItems,
                                          selectedMenu,
                                          onMenuClick,
                                          children,
                                          hasLink,
                                          linkText,
                                          linkUrl,
                                      }: LayoutProps) {
    const { t } = useTranslation();
    const [menuCollapsed, setMenuCollapsed] = useState(
        localStorage.getItem('sidebar-collapsed') === 'true',
    );

    function onCollapse(collapsed: boolean) {
        setMenuCollapsed(collapsed);
        localStorage.setItem('sidebar-collapsed', collapsed.toString());
    }


    const menu = (
        <Menu className="__layout-menu">
            <Menu.Item>
                <div className="__menu-item">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.bugasalt.com/">
                        {t('appbar.settings')}
                    </a>
                    <div className="__icon">
                        <SettingOutlined/>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="__menu-item">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.perdu.com/">
                        {t('appbar.account')}
                    </a>
                    <div className="__icon">
                        <UserOutlined/>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="__menu-item">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.bugasalt.com/">
                        {t('appbar.logout')}
                    </a>
                    <div className="__icon">
                        <LogoutOutlined/>
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className={`desktop-layout ${menuCollapsed ? '--collapsed' : ''}`}
        >
            <Header style={{ position: 'fixed' }}>

            </Header>
            <Sider
                width="240px"
                collapsible
                collapsed={menuCollapsed}
                onCollapse={onCollapse}
            >
                {/*<Menu*/}
                {/*  theme="dark"*/}
                {/*  onClick={({ key }) => {*/}
                {/*    // @ts-ignore*/}
                {/*      onMenuClick && onMenuClick(key);*/}
                {/*  }}*/}
                {/*  selectedKeys={selectedMenu ? [selectedMenu] : []}*/}
                {/*  mode="inline"*/}
                {/*>*/}
                {/*  {topMenuItems &&*/}
                {/*    topMenuItems.map((item) => (*/}
                {/*      <Menu.Item key={item.route} className="sider-item">*/}
                {/*        <span className="__item-icon">{item.icon}</span>*/}
                {/*        <span className="__item-text">{item.label}</span>*/}
                {/*          <span className="__add-button" onClick={(e) => {*/}
                {/*              e.stopPropagation();*/}
                {/*              console.log("add");*/}
                {/*            }}>*/}
                {/*            <PlusOutlined className="__plus-icon"*/}
                {/*              style={{*/}
                {/*                color: '#FFFFFF'*/}
                {/*              }}/>*/}
                {/*          </span>*/}
                {/*        {"\t"}*/}
                {/*      </Menu.Item>*/}
                {/*    ))}*/}
                {/*    <hr />*/}
                {/*  {bottomMenuItems &&*/}
                {/*    bottomMenuItems.map((item) => (*/}
                {/*      <Menu.Item key={item.route} className="sider-item">*/}
                {/*        <span className="__item-icon">{item.icon}</span>*/}
                {/*        <span className="__item-text">{item.label}</span>*/}
                {/*        <Link to={item.route}>*/}
                {/*          <span className="__add-button" onClick={() => console.log("add")}>*/}
                {/*            <PlusOutlined className="__plus-icon"*/}
                {/*              style={{*/}
                {/*                color: '#FFFFFF'*/}
                {/*              }} />*/}
                {/*          </span>*/}
                {/*        </Link>*/}
                {/*        {"\t"}*/}
                {/*      </Menu.Item>*/}
                {/*    ))}*/}
                {/*</Menu>*/}
            </Sider>
            <Content className={'content-layout'}>
                <Suspense fallback={<LoaderOverlay size="large" loading={true}/>}>
                    {children}
                </Suspense>
            </Content>
        </Layout>
    );
}
