import * as React from 'react';
import { Spin } from 'antd';
import './LoaderOverlay.scss';

interface LoaderOverlayProps {
    label?: string;
    size?: string;
    loading?: boolean;
}

export default React.memo(function LoaderOverlay({
                                                     label,
                                                     size,
                                                     loading,
                                                 }: LoaderOverlayProps) {
    return !loading ? null : (
        <div className="loader-overlay">
            <Spin />
        </div>
    );
});
