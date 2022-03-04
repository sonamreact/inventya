import React from 'react';

import { Form, Input, Button, Row, Col, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface Props {
    onforgotPassword: (data: any) => void;
    loading: boolean;
}

export default function ForgotPasswordForm({
                                      onforgotPassword,
                                      loading,
                                  }: Props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const params = useParams();

    function handleSubmit(values: any) {
        if (onforgotPassword) {
            const { password } = values;
            const token = params.token;
            onforgotPassword({password, token});
        }
    }

    return (
        <Form
            className={'forgot-password-form'}
            form={form}
            fields={[]}
            onFinish={handleSubmit}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            requiredMark={false}
        >

            <Form.Item
                label={'Password'}
                name='password'
                rules={[
                    { required: true, message: 'Password required' },
                ]}>
                <Input
                    autoComplete={'off'}
                    placeholder='Enter password'
                    type='password'
                />
            </Form.Item>

            <Form.Item
                className={'multiple-line-label'}
                label={'Confirm Password'}
                name='confirmPassword'
                rules={[
                    { required: true, message: 'Password required' },
                ]}>
                <Input
                    autoComplete={'off'}
                    placeholder='Confirm password'
                    type='password'
                />
            </Form.Item>
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
