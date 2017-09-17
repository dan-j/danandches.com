import React from 'react';
import { IImage } from '../services/api';
import { ImageDimensions } from '../util/image-layout';
import styled from 'styled-components';
import Image from './Image';

interface ImageGroupProps {
    images: IImage[];
    dimensions: ImageDimensions[][];
    maxHeight: number;

    onImageSelected(selectedIndex: number): void;
}

const ImageRowWrapper = styled.div`
    display: inline-block;
    width: 100%;
    line-height: 0;
    margin-bottom: 6px;
`;

export default class ImageGroup extends React.Component<ImageGroupProps, {}> {
    render() {
        const { images, dimensions, maxHeight } = this.props;
        let imageIndex = 0;
        return (
            <div>
                {dimensions.map((rowDimensions: ImageDimensions[], index: number) => (
                    <ImageRowWrapper key={index}>
                        {rowDimensions.map((dim: ImageDimensions) => {
                            const i = images[imageIndex];
                            imageIndex += 1;
                            return (
                                <Image
                                    key={i.id}
                                    src={i.url}
                                    fetchHeight={maxHeight}
                                    height={dim.height}
                                    {...(dim.height > maxHeight ? {} : { width: dim.width })}
                                    index={i.index}
                                    onImageSelected={this.props.onImageSelected}
                                />
                            );
                        })}
                    </ImageRowWrapper>
                ))}
            </div>
        );
    }
}
