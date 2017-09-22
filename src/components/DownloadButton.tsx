import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Centered from './styled/Centered';

const DownloadButton: React.SFC<{}> = () => (
    <Centered>
        <RaisedButton
            primary
            style={{ margin: '0 auto' }}
            href="http://bit.ly/2waPTxq"
            label="Download .zip (6.2GB)"
        />
    </Centered>
);

export default DownloadButton;
