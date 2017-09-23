import React from 'react';
import styled from 'styled-components';
import { blue } from '../styles/colors';

interface FooterProps {

}

const FooterContainer = styled.div`
    margin-top: 200px;
    background-color: ${blue};
    color: #FFF;
    text-align: center;
    box-sizing: border-box;
    padding: 2em;
    
    font-size: 0.8em;
    font-weight: 300;
    a {
        text-decoration: none;
        color: white;
        
        img {
            margin-right: 0.5em;
        }
        
        img, span {
            vertical-align: middle;
        }
    }
`;

export default class Footer extends React.Component<FooterProps, {}> {

    render() {
        return (
            <FooterContainer>
                <p>Copyright © 2017 danandches.com, All rights reserved.</p>
                <p><a href="https://www.instagram.com/danandchestravel">
                    <img
                        src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png"
                        style={{ marginRight: '0.5em' }}
                        height="24"
                        width="24"
                    /><span> @danandchestravel</span>
                </a>
                </p>
            </FooterContainer>
        );
    }
}
