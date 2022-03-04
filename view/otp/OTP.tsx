import React, { useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { Row, Col, Carousel, Typography, notification } from 'antd';
import OTPForm from './OTPForm';

import './OTP.scss';
import { useTranslation } from 'react-i18next';

import logo from 'shared/assets/logo.png';
import title from './assets/title.png';
import button from './assets/button.png';
import banner from './banner.png';
import button_left from './assets/button_left.png'
import button_right from './assets/button_right.png'

//STATIC
import product1 from './assets/product1.png'
import product2 from './assets/product2.png'
import product3 from './assets/product3.png'
import product4 from './assets/product4.png'
import product5 from './assets/product5.png'

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

export default function OTP({ location }: Props) {
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
                        <Row className='otp-form-row'>
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
                            <Col sm={10} className={'otp-form-wrapper-column'}>
                                <div className='otp-form-wrapper'>
                                    <div className={'text-center'}>
                                      <img src={logo} className={'form-logo'} />
                                    </div>
                                    <div className="logo-subtitle">
                                        Enter Login Security Code Received <br/> on your Registered Mobile Number +44 XXXX-XXXX66
                                    </div>
                                    <OTPForm
                                        onOTP={async (email: string, otp: string) => {
                                            setLoading(true);
                                            try {
                                                await API_SERVICE.otpVerifcation(email, otp);
                                                notification.success({
                                                    message: 'OTP verified',
                                                });
                                                setLoading(false);
                                                // history.push(COMPANY_LIST);
                                                history.push('login');
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
