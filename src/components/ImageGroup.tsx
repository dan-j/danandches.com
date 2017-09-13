import React from 'react';
import { IImage } from '../services/api';
import { ImageDimensions } from '../util/image-layout';
import styled from 'styled-components';
import Image from './Image';

interface ImageGroupProps {
    images: IImage[];
    dimensions: ImageDimensions[][];
    maxHeight: number
}

const ImageRowWrapper = styled.div`
    display: inline-block;
    width: 100%;
`;

const ImageGroup: React.StatelessComponent<ImageGroupProps> = ({ images, dimensions, maxHeight }) => {
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
                            />
                        );
                    })}
                </ImageRowWrapper>
            ))}
        </div>
    );
};

export default ImageGroup;
