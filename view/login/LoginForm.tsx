import React, {useState} from 'react';

import { Form, Input, Button, Row, Col, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {FORGOT_PASSWORD} from  '../../../shared/constants/RouteConstants';
import API_SERVICE from 'client/src/services/api-service';

interface Props {
    onLogin: (email: string, password: string) => void;
    loading: boolean;
}

export default function LoginForm({
                                      onLogin,
                                      loading,
                                  }: Props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const history = useHistory();

    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleSubmit(values: any) {
        if (onLogin) {
            const { email, password } = values;
            onLogin(email, password);
        }
    }


    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Form
                className={'login-form'}
                form={form}
                fields={[]}
                initialValues={
                    {
                        email: 'admin',
                        password: '6EqTQDtzqisNJLj',
                    }
                }
                onFinish={handleSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                requiredMark={false}
            >
                <Form.Item
                    label={'Email ID'}
                    name='email'
                    rules={[
                        { required: true, message: 'Email required' },
                    ]}
                >
                    <Input autoComplete={'off'}
                    />
                </Form.Item>
                <Form.Item
                    style={{marginBottom: 0}}
                    label={'Password'}
                    name='password'
                    rules={[
                        { required: true, message: 'Password required' },
                    ]}>
                    <Input
                        autoComplete={'off'}
                        type='password'
                    />
                </Form.Item>
                <Row justify={'end'}>
                    <Col sm={18} className={'text-right'}>
                        <small><a className="theme-link" onClick={showModal}>Forgot Password?</a></small>
                    </Col>
                </Row>
                <br/>
                <Form.Item style={{justifyContent: 'flex-end'}}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={loading}
                        shape='round'
                        className='theme-button primary full-width '
                    >
                        Login
                    </Button>
                </Form.Item>
                <Row justify={'end'}>
                    <Col sm={18} className={'text-center'}>
                        or <a href="register" className="theme-link">Register with us</a>
                    </Col>
                </Row>
            </Form>

            <Modal title="Forgot Password"
                   footer={null}
                   visible={isModalVisible}
                   onCancel={handleCancel}
            >
                <Form
                    className={'forgot-password-form'}
                    fields={[]}
                    onFinish={async (value: string) => {
                        try {
                            // @ts-ignore
                            await API_SERVICE.forgotPassword(value.f_email);
                            notification.success({
                                message: 'An email with new password has been sent to you!',
                            });
                            handleCancel();
                        } catch (e) {
                            notification.error({
                                message: t(API_SERVICE.handleErrors(e)),
                            });
                        }
                    }}
                    requiredMark={false}
                    layout={'inline'}
                >
                    <Form.Item
                        style={{flex: 1}}
                        label={'Email ID'}
                        name='f_email'
                        rules={[
                            { required: true, message: 'Email required' },
                        ]}
                    >
                        <Input autoComplete={'off'}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            className='theme-button primary full-width '
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
