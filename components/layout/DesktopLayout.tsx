import * as React from 'react';
import { ReactElement, Suspense } from 'react';
import { Link } from 'react-router-dom';
import logo from 'shared/assets/logo.png';

import { Typography, Col, Space, Layout, Avatar, Row, Dropdown, Menu } from 'antd';
import { AppstoreOutlined, LogoutOutlined, ShopOutlined, ShoppingOutlined, HomeOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import API_SERVICE from '../../../client/src/services/api-service';

import {
    DashboardOutlined,
    BallotOutlined,
    StoreOutlined,
    LocationOnOutlined,
    EmailOutlined,
    PhoneOutlined,
} from '@material-ui/icons';

import LoaderOverlay from 'shared/components/LoaderOverlay';

import './Layout.scss';

//_
import { AuthConsumer, logout } from '../../contexts/AuthContext';



const { Header, Footer, Content } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;

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

export const globals = {
  refresh: ()=>false,
}

export default function DesktopLayout({
                                          selectedMenu,
                                          onMenuClick,
                                          children,
                                          hasLink,
                                          linkText,
                                          linkUrl,
                                      }: LayoutProps) {
    const history = useHistory();
    const { t } = useTranslation();

    const [popup,set_popup] = React.useState([])
    const [counters,set_counters] = React.useState({})


    const menu = (
        <Menu>
            <Menu.Item onClick={()=>history.push('/franchise-profile')}>
                <Space><ShopOutlined /> <Text>Franchise Profile</Text></Space>
            </Menu.Item>
            <Menu.Item onClick={()=>history.push('/users')}>
                <Space><UserOutlined /> <Text>User Management</Text></Space>
            </Menu.Item>
            <Menu.Item onClick={()=>history.push('/orders')}>
                <Space><ShoppingOutlined /> <Text>Orders</Text></Space>
            </Menu.Item>
            <Menu.Item onClick={()=>history.push('/addresses')}>
                <Space><HomeOutlined /> <Text>Manage Addresses</Text></Space>
            </Menu.Item>
            <Menu.Item onClick={()=>logout()}>
                <Space><LogoutOutlined /> <Text>Logout</Text></Space>
            </Menu.Item>
        </Menu>
    );


      async function refresh() {
        try {
          const resp = await API_SERVICE.header_count();
          if (resp.data.data){
            set_counters(resp.data.data)
          }
        } catch (e) {
        }
      }

      React.useEffect(()=>{
        refresh()
        globals.refresh = refresh
      },[])

    return (
        <Layout
            hasSider={false}
            style={{ minHeight: '100vh' }}
            className={`desktop-layout`}
        >
            <Header style={{ position: 'fixed' }}>
                <Row gutter={20}>
                    <Col flex={'auto'}>
                        <Row gutter={20}>
                            <Col>
                                <div className="custom-nav-link">
                                    <Link to={'/'}>
                                        <img src={logo} className="logo" />
                                    </Link>
                                </div>
                            </Col>
                            <Col>
                              <AuthConsumer>
                              {({ isAuth, user }) => (
                                <div className="custom-nav-link">
                                  <div className="login-details">
                                    {(user.role.name==='FRANCHISE_OWNER' || user.role.name==='FRANCHISE_USER')?
                                      <Space size={5}>
                                        <div className="linear">
                                        <img src={user.franchise.file? user.franchise.file.url:''} style={{height:'30px',margin:'8px'}}/>
                                        <div className="login-rows">
                                            <div className="row-1">
                                              {user.franchise.name}
                                            </div>
                                            <div className="row-2">
                                                Franchise Code: {user.franchise.code}
                                            </div>
                                        </div>
                                        </div>
                                      </Space>
                                      :<Space size={5} />
                                    }
                                  </div>
                                </div>
                              )}
                              </AuthConsumer>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <div onClick={()=>history.push('/dashboard')} className="custom-nav-link">
                                    <DashboardOutlined/>
                                    <span className={'text'}>
                                        Dashboard
                                    </span>
                                </div>
                            </Col>
                            <Col>
                              <a href='http://training.dhoneapp.com/'>
                                <div className="custom-nav-link">
                                    <BallotOutlined/>
                                    <span className={'text'}>
                                        Training
                                    </span>
                                </div>
                              </a>
                            </Col>
                            <Col>
                                <div onClick={()=>history.push('/cart')} className="custom-nav-link">
                                    <StoreOutlined/>
                                    {(counters.cartCount>0) &&
                                      <div style={styles.count}>
                                        {counters.cartCount}
                                      </div>
                                    }
                                    <span className={'text'}>
                                        Cart
                                    </span>
                                </div>
                            </Col>
                            <Col>
                                <div onClick={()=>history.push('/wishlist')} className="custom-nav-link">
                                    <HeartOutlined/>
                                    {(counters.wishlistCount>0) &&
                                      <div style={styles.count}>
                                        {counters.wishlistCount}
                                      </div>
                                    }
                                    <span className={'text'}>
                                        Wishlist
                                    </span>
                                </div>
                            </Col>
                            <Col>
                                <AuthConsumer>
                                    {({ isAuth, user }) =>
                                        (<Dropdown overlay={menu} placement='bottomRight'>
                                            <div className='custom-nav-link account-details'>
                                                <Avatar size={45} src={user.file?user.file.url:null} icon={<UserOutlined />} />
                                                <Text>{user.name}</Text>
                                                <Text>({user.role.name})</Text>
                                            </div>
                                        </Dropdown>)
                                    }
                                </AuthConsumer>
                                {/*
                                  <div className="custom-nav-link account-details">
                                      <Avatar size={30} icon={<UserOutlined/>}/>
                                      <Text>Sameer Dua</Text>
                                      <Text>(Admin)</Text>
                                  </div>
                                */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Header>

            <Content className={'content-layout'}>
                {/*<HomeHeader/>*/}

                <Suspense fallback={<LoaderOverlay size="large" loading={true}/>}>
                    {children}
                </Suspense>
            </Content>
            <div className="footer-wrapper">
                <Row gutter={20} className={'primary-footer'}>
                    <Col flex={'auto'} className={'text-center links'}>
                        <div className={'link'}>
                            <LocationOnOutlined/> <Text>Visit Us</Text>
                        </div>
                        <div className={'link'}>
                            <EmailOutlined/> <Text>Email Us</Text>
                        </div>
                        <div className={'link'}>
                            <PhoneOutlined/> <Text>Call Us</Text>
                        </div>
                    </Col>
                </Row>
                <Row gutter={20} className={'secondary-footer'}>
                    <Col flex={'auto'}>
                        <Text>2021 | Danube Home | Dubai</Text>
                    </Col>
                    <Col>
                        <Text>Disclaimer</Text>
                    </Col>
                    <Col>
                        <Text>Privacy Policy</Text>
                    </Col>
                </Row>
            </div>
            {popup}
        </Layout>
    );
}

const styles = {
  count: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    left: -12,
    backgroundColor: '#000',
    color: '#FFF',
    marginRight: -16,
    height: 16,
    width: 16,
    borderRadius: 16,
    fontSize: 8,
    }
}
