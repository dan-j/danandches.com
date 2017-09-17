import React from 'react';
import { stringify } from 'querystring';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { BlurredImg, Img } from './styled/Img';
import styled from 'styled-components';
import Pulse from './styled/Loading/Pulse';
import Overlay from './styled/Overlay';

interface ImageProps {
    src: string;
    preSrc?: string;
    fetchHeight: number;
    height: number;
    width?: number;
}

interface ImageState {
    loaded: boolean;
    thumbnailLoaded: boolean;
}

const Picture = styled.picture`
    display: block;
`;

const ImageContainer = styled.div`
    display: inline-block;
    overflow: hidden;
    margin-right: 6px;
    position: relative;
    
    &:last-child {
        margin-right: 0;
    }
`;

const BlurredPicture = Picture.extend`
    overflow: hidden;
    position: relative;
`;

export default class Image extends React.Component<ImageProps, {}> {

    state: ImageState = {
        loaded: false,
        thumbnailLoaded: false,
    };

    onLoad = () => this.setState({ loaded: true });

    onThumbnailLoad = () => this.setState({ thumbnailLoaded: true });

    renderThumbnail(src: string, thumbHeight: number, height: number, width?: number) {
        const query = {
            h: thumbHeight,
            fl: 'progressive',
        };
        const webPQuery = {
            h: thumbHeight,
            fm: 'webp',
        };

        const normalSrc = `${src}?${stringify(query)}`;

        const imgProps = {
            src: normalSrc,
            height,
            width,
        };

        return (
            <BlurredPicture>
                <source srcSet={`${src}?${stringify(webPQuery)}`} type="image/webp" />
                <source srcSet={normalSrc} type="image/jpeg" />
                <BlurredImg
                    {...imgProps}
                    onLoad={this.onThumbnailLoad}
                />
                <Overlay shouldFill={!this.state.thumbnailLoaded}>
                    <Pulse />
                </Overlay>
            </BlurredPicture>
        );
    }

    renderFullImage(src: string, fetchHeight: number, height: number, width?: number) {
        const query = {
            h: fetchHeight,
            fl: 'progressive',
        };
        const retinaQuery = {
            ...query,
            h: fetchHeight * 2,
        };
        const webPQuery = {
            h: fetchHeight,
            fm: 'webp',
        };
        const retinaWebPQuery = {
            ...webPQuery,
            h: fetchHeight * 2,
        };

        const normalSrc = `${src}?${stringify(query)}`;

        const imgProps = {
            src: normalSrc,
            height,
            width,

        };

        const webPSrcSet =
            `${src}?${stringify(retinaWebPQuery)} 2x, ${src}?${stringify(webPQuery)} 1x`;
        const jpegSrcSet =
            `${src}?${stringify(retinaQuery)} 2x, ${normalSrc} 1x`;
        return (
            <Picture>
                <source srcSet={webPSrcSet} type="image/webp" />
                <source srcSet={jpegSrcSet} type="image/jpeg" />
                <Img
                    {...imgProps}
                    onLoad={this.onLoad}
                    hidden={!this.state.loaded}
                />
            </Picture>
        );
    };

    render() {
        const { src, fetchHeight, height, width } = this.props;
        return (
            <ImageContainer>
                <TransitionGroup>
                    {!this.state.loaded && (
                        <CSSTransition classNames="fade" timeout={200}>
                            {this.renderThumbnail(src, 20, height, width)}
                        </CSSTransition>
                    )}
                    {this.renderFullImage(src, fetchHeight, height, width)}
                </TransitionGroup>
            </ImageContainer>
        );
    }
}
