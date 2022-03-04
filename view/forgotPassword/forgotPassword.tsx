import React, { useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { Row, Col, Carousel, Typography, notification } from 'antd';
import ForgotPasswordForm from './forgotPasswordForm';

import './forgotPassword.scss';
import { useTranslation } from 'react-i18next';

import logo from 'shared/assets/logo.png';
import title from './assets/title.png';

import { AuthConsumer } from 'shared/contexts/AuthContext';
import API_SERVICE from 'client/src/services/api-service';
import { COMPANY_LIST } from '../../constants/RouteConstants';

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

export default function ForgotPassword({ location }: Props) {
    const { t } = useTranslation();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { from } = location.state || { from: { pathname: '/' } };

    return (
        <AuthConsumer>
            {({ isAuth, updateAuthToken }) => {
                console.log(isAuth, '========');
                return (isAuth ? (
                    <Redirect to={from} />
                ) : (
                    <div className='otp'>
                        <Row className='forgot-password-form-row'>
                            <Col sm={14} className="otp-text-column">
                                <div className="otp-text-wrapper">
                                    <div className={'title'}>Simply Claim your</div>
                                    <div className={'heading'}>R&D Tax Credit</div>
                                    <div className={'bar-wrapper'}>
                                        <span className="bar"></span>
                                        <span className="bar-text">EASY | FAST | SAFE</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={10} className={'forgot-password-form-wrapper-column'}>
                                <div className='forgot-password-form-wrapper'>
                                    <div className={'text-center'}>
                                      <img src={logo} className={'form-logo'} />
                                    </div>
                                    <div className="logo-subtitle">
                                        Enter New Password
                                    </div>
                                    <ForgotPasswordForm
                                        onforgotPassword={async (data: any) => {
                                            setLoading(true);
                                            try {
                                                await API_SERVICE.resetPassword(data);
                                                notification.success({
                                                    message: 'Password changed',
                                                });
                                                setLoading(false);
                                                history.push('/login');
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
