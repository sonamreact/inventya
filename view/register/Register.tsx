import React, {useState} from 'react';
import {Redirect, useHistory, Link} from 'react-router-dom';
import {Row, Col, Carousel, Typography, notification, Button} from 'antd';
import RegisterForm from './RegisterForm';

import './Register.scss';
import {useTranslation} from 'react-i18next';

import logo from 'shared/assets/logo.png';

import {AuthConsumer} from 'shared/contexts/AuthContext';
import API_SERVICE from 'client/src/services/api-service';
import {OTP} from "../../constants/RouteConstants";

const {Title} = Typography;

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

export default function Register({location}: Props) {
    const history = useHistory();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const {from} = location.state || {from: {pathname: '/'}};

    return (
        <AuthConsumer>
            {({isAuth, updateAuthToken}) => {
                return (isAuth ? (
                    <Redirect to={from}/>
                ) : (
                    <div className='register'>
                        <Row className='register-form-row'>
                            <Col sm={14} className={'register-form-wrapper-column text-center'}>
                                <div className='register-form-wrapper'>
                                    <div>
                                        <img src={logo} className={'form-logo'}/>
                                    </div>
                                    <div className="logo-subtitle">
                                        Simply Claim your R&D Tax Credit. Register with us now.
                                    </div>
                                    <RegisterForm
                                        onRegister={async (email: string, name: string, role: string, phoneNumber: string, cNumber: string, cName: string, incorporationDate: string, employeesNumber: string, isSME: boolean) => {
                                            setLoading(true);
                                            try {
                                                const {data: {data}} = await API_SERVICE.register(email, name, role, phoneNumber, cNumber, cName, incorporationDate, employeesNumber, isSME);
                                                notification.success({
                                                    message: 'Company Registered',
                                                });
                                                setLoading(false);
                                                history.push(OTP);
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
                            <Col sm={10} className="register-text-column">
                                <div className="register-text-wrapper">
                                    <h2>Let us help you maximise your claim!</h2>
                                    <div className="video-wrapper">
                                        <iframe width="500" style={{maxWidth: '100%' }} height="281" src="https://www.youtube.com/embed/mtRcGrM-EZo"
                                                title="YouTube video player" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen />
                                    </div>


                                    <div className="register-grid-wrapper">
                                        <div className="register-grid">
                                            <div className="grid-item">
                                                <h1>100%</h1>
                                                <div>Success rate</div>
                                            </div>
                                            <div className="grid-item">
                                                <h1>$53,488</h1>
                                                <div>Average Claim</div>
                                            </div>
                                            <div className="grid-item">
                                                <h1>200</h1>
                                                <div>Companies supported</div>
                                            </div>
                                            <div className="grid-item">
                                                <h1>$140M</h1>
                                                <div>Claimed</div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={'text-center'}>
                                            <Button
                                                type='primary'
                                                htmlType='button'
                                                loading={loading}
                                                shape='round'
                                                className='theme-button primary'
                                                href={'https://www.inventya.com/'}
                                                target="_blank"
                                            >
                                                Know More
                                            </Button>
                                        </div>
                                    </div>
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
