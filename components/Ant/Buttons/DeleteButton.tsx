import * as React from 'react';
import { Button as BaseButton } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

type Props = {
    onClick: () => void;
    style?: any
}

const DeleteButton: React.FunctionComponent<Props> = ({ onClick, style }) => {
    return (
        <BaseButton
            type="primary"
            style={style}
            shape="circle"
            onClick={onClick}
            icon={<DeleteFilled/>}
        />
    );
};
export default DeleteButton;
