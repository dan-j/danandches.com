import React from 'react';
import { IImageGroup } from '../services/api';
import { calculate, ImageDimensions } from '../util/image-layout';
import ImageGroup from './ImageGroup';

interface ImageGroupProps {
    group: IImageGroup;
    expanded: boolean;
    containerWidth: number;
    preferredHeight: number;
}

interface ImageGroupState {
    imageDimensions: ImageDimensions[][];
}

export default class ImageGroupContainer extends React.Component<ImageGroupProps, ImageGroupState> {

    getImageDimensions = (containerWidth: number) => {
        const { group: { images }, preferredHeight } = this.props;
        return calculate(images, containerWidth, preferredHeight);
    };

    state: ImageGroupState = {
        imageDimensions: this.getImageDimensions(this.props.containerWidth),
    };

    componentWillReceiveProps(nextProps: ImageGroupProps) {
        if (this.props.containerWidth !== nextProps.containerWidth) {
            this.setState({
                imageDimensions: this.getImageDimensions(nextProps.containerWidth),
            });
        }
    }

    render() {
        const { group, expanded } = this.props;
        return (
            <section>
                <h4>{group.title}</h4>
                <p>{group.images.length} Images</p>
                <p>Width: {this.props.containerWidth}</p>
                {expanded && (
                    <ImageGroup
                        images={group.images}
                        dimensions={this.state.imageDimensions}
                        maxHeight={this.props.preferredHeight}
                    />
                )}
            </section>
        );
    }
}
