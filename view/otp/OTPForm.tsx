import React from 'react';

import { Form, Input, Button, Row, Col, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

interface Props {
    onOTP: (email: string, password: string) => void;
    loading: boolean;
}

export default function OTPForm({
                                      onOTP,
                                      loading,
                                  }: Props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    function handleSubmit(values: any) {
        if (onOTP) {
            const { email, otp } = values;
            onOTP(email, otp);
        }
    }

    return (
        <Form
            className={'otp-form'}
            form={form}
            fields={[]}
            initialValues={
                {
                    email: 'admin',
                    password: 'asdf@1234',
                }
            }
            onFinish={handleSubmit}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            requiredMark={false}
        >

            <Form.Item
                style={{alignItems: 'center', marginBottom: 0}}
                label={'OTP'}
                name='otp'
                rules={[
                    { required: true, message: 'Password required' },
                ]}>
                <InputNumber
                    autoComplete={'off'}
                    placeholder='Enter one time password'
                    type='password'
                    max={9999}
                />
            </Form.Item>
            <Row justify={'end'}>
                <Col sm={18} className={'text-right'}>
                    <small>didn't receive OTP? <a href="" className="theme-link">Re-send</a></small>
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
