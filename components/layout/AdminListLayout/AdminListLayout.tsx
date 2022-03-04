import * as React from 'react';

import { useTranslation } from 'react-i18next';

import './index.scss';
import { Col, Row, Typography, Form, Select } from 'antd';

const { Title } = Typography;

interface LayoutProps {
    children: any;
    title?: any,
    titleIcon?: any,
    titleSearch?: any,
    titleAction?: any,
    onMenuClick?: (route: string) => void;
    panel? : any;
    pagination: any;
    filters: any;
}

export default function AdminListLayout({ children, titleSearch, titleIcon, titleAction, title, panel, pagination, filters }: LayoutProps) {
    const { t } = useTranslation();

    return (
        <div className={'admin-list-layout'}>
            <Row className='title-bar' align={'middle'} gutter={20} wrap={false}>
                {
                    titleAction && <Col>
                        {titleAction}
                    </Col>
                }
                <Col flex={'auto'}>
                    <Row gutter={20} align={'middle'}>
                        {
                            titleSearch && <Col sm={6}>
                                {titleSearch}
                            </Col>
                        }

                        {
                            filters ? filters : <></>
                        }

                        {
                            pagination && <Col flex={'auto'} className={'text-right'}>
                                {pagination}
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>

            {/*{
                subheader && <Row className='title-bar' align={'middle'} gutter={20} wrap={false}>
                    {
                        subheader.map((item,index)=>
                            <Col key={index}>
                                {item}
                            </Col>
                        )
                    }
                </Row>
            }*/}

            {
                children
            }
        </div>
    );
}
