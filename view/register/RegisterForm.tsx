import React, {useState} from 'react';
import {Form, Input, Button, Row, Col, Radio, Checkbox, DatePicker, notification} from 'antd';
import {useTranslation} from 'react-i18next';
import "antd/dist/antd.css";
import moment from 'moment';
import API_SERVICE from 'client/src/services/api-service';

interface Props {
    onRegister: (email: string, name: string, role: string, phoneNumber: string, cNumber: string, cName: string, incorporationDate: string, employeesNumber: string, isSME: boolean) => void;
    loading: boolean;
}

export default function RegisterForm({
                                         onRegister,
                                         loading,
                                     }: Props) {
    const {t} = useTranslation();
    const [form] = Form.useForm();

    const [isChecked, setChecked] = useState(false);

    const onCheckboxChange = async (e: any) => {
        await setChecked(e.target.checked);
    };

    function handleSubmit(values: any) {
        if (onRegister) {
           const {email, name, role, phoneNumber, cNumber, cName, incorporationDate, employeesNumber,isSME} = values;
           onRegister(email, name, role, phoneNumber, cNumber, cName, incorporationDate.format('YYYY-MM-DD'), employeesNumber, isSME);
       }
    }

    const fetchCompanyHouseDetails = async (e: any) => {
        let cin = e.target.value;

        if(cin){
            try {
                const { data: { data } } = await API_SERVICE.getCompanyHouseDetails(cin);
                form.setFieldsValue({
                    ['cName']: data.name,
                    ['incorporationDate']: moment(data.incorporationDate),
                })
            } catch (e) {
                notification.error({ message: API_SERVICE.handleErrors(e) });
            }
        }
    }

    /*React.useEffect(()=>{
      console.log(isChecked)
    },[isChecked])*/

    function disabledDate(current: any) {
        return current && current > moment().endOf('day');
    }

    return (
        <Form
            className={'register-form'}
            form={form}
            initialValues={
                {
                    email: 'admin@admin.com',
                    password: 'asdf@123',
                }
            }
            onFinish={handleSubmit}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            requiredMark={false}
        >
            <Form.Item
                label={'Name'}
                name='name'
                rules={[
                    {required: true, message: 'Name required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="Enter your full name"
                />
            </Form.Item>
            <Form.Item
                label={'Email ID'}
                name='email'
                rules={[
                    {required: true, type: 'email', message: 'Email required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="Enter your official email ID"
                />
            </Form.Item>
            <Form.Item
                className={'multiple-line-label'}
                label={'Role in your company?'}
                name='role'
                rules={[
                    {required: true, message: 'Role required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="Enter your role in the company"
                />
            </Form.Item>

            <Form.Item
                label={'Mobile Number'}
                name='phoneNumber'
                rules={[
                    {required: true, message: 'Mobile number required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="+44XXXXXXXXXX"
                />
            </Form.Item>

            <Form.Item
                label={'Company Number'}
                name='cNumber'
                rules={[
                    {required: true, message: 'Company number required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="XXXXXXXX" onBlur={fetchCompanyHouseDetails} onPressEnter={fetchCompanyHouseDetails}
                />
            </Form.Item>

            <Form.Item
                label={'Company Name'}
                name='cName'
                rules={[
                    {required: true, message: 'Mobile number required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="Enter your company name"
                />
            </Form.Item>


            <Form.Item
                label={'Incorporation Date'}
                name='incorporationDate'
                rules={[
                    {required: true, message: 'Date required'},
                ]}
            >
                <DatePicker
                    disabledDate={disabledDate}
                    placeholder="Select date (DD/MM/YYYY)"
                />
            </Form.Item>

            <Form.Item
                className={'multiple-line-label'}
                label={'Number of Employees'}
                name='employeesNumber'
                rules={[
                    {required: true, message: 'Mobile number required'},
                ]}
            >
                <Input autoComplete={'off'} placeholder="Enter the total number of employees"
                />
            </Form.Item>

            <Form.Item label="is SME" name="isSME" style={{textAlign: 'left'}}>
                <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                style={{marginBottom: 0}}
                label={'Consent'}
                name='consent'
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept Terms & Conditions')),
                    },
                ]}
                >
                <Checkbox checked={isChecked} onChange={onCheckboxChange}>
                    I accept the <a href="" className="theme-link">Terms & Conditions.</a>
                </Checkbox>
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
                    Register Now
                </Button>
            </Form.Item>
            <Row justify={'end'}>
                <Col sm={18} className={'text-center'}>
                    or <a href="login" className="theme-link">Login with us</a>
                </Col>
            </Row>
        </Form>
    );
}
