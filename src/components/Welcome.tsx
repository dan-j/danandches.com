import React from 'react';
import Centered from './styled/Centered';
import { SubText } from './styled/SubText';
import DownloadButton from './DownloadButton';
import styled from 'styled-components';
import { teal } from '../styles/colors';

interface WelcomeProps {

}

const WelcomeContainer = Centered.extend`
    padding: 0 1em;
    margin: 1em auto 0;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    
    @media screen and (min-width: 576px) {
        max-width: 70%;
    }

    @media screen and (min-width: 1200px) {
        max-width: 1200px;
    }
`;

const TextContainer = styled.div`
    max-width: 650px;
    
    margin-left: auto;
    margin-right: auto;
    
    a {
        color: ${teal};
        text-decoration: none;
    }
`;

export default class Welcome extends React.Component<WelcomeProps, {}> {

    render() {
        return (
            <WelcomeContainer>
                <TextContainer>
                    <p>Thank you for joining us on our wedding day!</p>
                    <p>It's been a long time coming, but finally we have our wedding photos to share
                        with you!</p>
                    <SubText>
                        Full quality images suitable for printing can also be downloaded
                        below</SubText>
                </TextContainer>
                <DownloadButton />
                <TextContainer>
                    <p>Credits to our photographer <a href="http://bit.ly/2hpqY2Q">
                        @lauraleephotographyuk</a> who did an amazing job!</p>
                </TextContainer>
            </WelcomeContainer>
        );
    }
}
