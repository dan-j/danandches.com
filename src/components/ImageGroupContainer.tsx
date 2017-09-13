import React from 'react';
import { IImageGroup } from '../services/api';
import { calculate, ImageDimensions } from '../util/image-layout';
import ImageGroup from './ImageGroup';
import styled from 'styled-components';
import Loading from './styled/Loading';

interface ImageGroupProps {
    group: IImageGroup;
    containerWidth: number;
    preferredHeight: number;
}

interface ImageGroupState {
    imageDimensions?: ImageDimensions[][];
}

const SubText = styled.span`
    font-size: 0.8em;
    font-style: italic;
    font-weight: 100;
    padding-left: 1em;
    float: right;
`;

export default class ImageGroupContainer extends React.Component<ImageGroupProps, ImageGroupState> {

    state: ImageGroupState = {};

    getImageDimensions = (containerWidth: number) => {
        const { group: { images }, preferredHeight } = this.props;
        return calculate(images, containerWidth, preferredHeight);
    };

    componentDidMount() {
        this.setState({
            imageDimensions: this.getImageDimensions(this.props.containerWidth),
        });
    }

    componentWillReceiveProps(nextProps: ImageGroupProps) {
        if (this.props.containerWidth !== nextProps.containerWidth) {
            this.setState({
                imageDimensions: this.getImageDimensions(nextProps.containerWidth),
            });
        }
    }

    render() {
        const { group } = this.props;

        const content = this.state.imageDimensions ? (
            <ImageGroup
                images={group.images}
                dimensions={this.state.imageDimensions}
                maxHeight={this.props.preferredHeight}
            />
        ) : <Loading />;

        return (
            <section>
                <h4>{group.title} <SubText>{group.images.length} Images</SubText></h4>
                {content}
            </section>
        );
    }
}
