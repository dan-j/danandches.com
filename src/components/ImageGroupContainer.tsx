import React from 'react';
import { IImageGroup } from '../services/api';
import { calculate, ImageDimensions } from '../util/image-layout';
import ImageGroup from './ImageGroup';
import Loading from './styled/Loading/Bars';
import { SubText } from './styled/SubText';

interface ImageGroupProps {
    group: IImageGroup;
    containerWidth: number;
    preferredHeight: number;

    onImageSelected(selectedIndex: number): void;

    onDimensionsCalculated(groupId: string): void;
}

interface ImageGroupState {
    imageDimensions?: ImageDimensions[][];
}

const RightSubText = SubText.extend`
    float: right;
    &:after {
        clear: both;
    }
`;

export default class ImageGroupContainer extends React.Component<ImageGroupProps, ImageGroupState> {

    state: ImageGroupState = {};

    onDimensionsCalculated = () => this.props.onDimensionsCalculated(this.props.group.id);

    calculateImageDimensions = (containerWidth: number) => {
        const { group: { images }, preferredHeight } = this.props;
        const imageDimensions = calculate(images, containerWidth, preferredHeight);

        this.setState({
            imageDimensions,
        }, this.onDimensionsCalculated);
    };

    componentDidMount() {
        this.calculateImageDimensions(this.props.containerWidth);
    }

    componentWillReceiveProps(nextProps: ImageGroupProps) {
        if (this.props.containerWidth !== nextProps.containerWidth) {
            this.calculateImageDimensions(nextProps.containerWidth);
        }
    }

    render() {
        const { group } = this.props;

        const content = this.state.imageDimensions ? (
            <ImageGroup
                images={group.images}
                dimensions={this.state.imageDimensions}
                maxHeight={this.props.preferredHeight}
                onImageSelected={this.props.onImageSelected}
            />
        ) : <Loading />;

        return (
            <section>
                <h4>{group.title} <RightSubText>{group.images.length} Images</RightSubText></h4>
                {content}
            </section>
        );
    }
}
