import React, { useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { Row, Col, Carousel, Typography, notification } from 'antd';
import LoginForm from './LoginForm';

import './Login.scss';
import { useTranslation } from 'react-i18next';

import logo from 'shared/assets/logo.png';


import { AuthConsumer } from 'shared/contexts/AuthContext';
import API_SERVICE from 'client/src/services/api-service';

const { Title } = Typography;

interface Props {
    location: any;
}

const contentStyle = {
    height: '373px',
    color: '#fff',
    lineHeight: '373px',
    textAlign: 'center',
    background: '#364d79',
};

export default function Login({ location }: Props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { from } = location.state || { from: { pathname: '/' } };

    return (
        <AuthConsumer>
            {({ isAuth, updateAuthToken }) => {
                return (isAuth ? (
                    <Redirect to={from} />
                ) : (
                    <div className='login'>
                        <Row className='login-form-row'>
                            <Col sm={14} className="login-text-column">
                                <div className="login-text-wrapper">
                                    {/*<div className={'title'}>Simply Claim your</div>*/}
                                    <div className={'heading'}>R&D Tax Credit</div>
                                    <div className={'bar-wrapper'}>
                                        <span className="bar"></span>
                                        <span className="bar-text">EASY | FAST | SAFE</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={10} className={'login-form-wrapper-column'}>
                                <div className='login-form-wrapper'>
                                    <div className={'text-center'}>
                                      <img src={logo} className={'form-logo'} />
                                    </div>
                                    <LoginForm
                                        onLogin={async (email: string, password: string) => {
                                            setLoading(true);
                                            try {
                                                const { data: { data } } = await API_SERVICE.login(email, password);
                                                updateAuthToken(data);
                                            } catch (e) {
                                                notification.error({
                                                    message: t(API_SERVICE.handleErrors(e)),
                                                });
                                                setLoading(false);
                                            }
                                        }}
                                        loading={loading}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                ));
            }
            }
        </AuthConsumer>
    );
}
