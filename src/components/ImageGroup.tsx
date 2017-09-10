import React from 'react';
import { IImage } from '../services/api';
import { ImageDimensions } from '../util/image-layout';
import Img from './common/Img';
import styled from 'styled-components';

interface ImageGroupProps {
    images: IImage[];
    dimensions: ImageDimensions[][];
    maxHeight: number
}

const ImageWrapper = styled.div`
    display: inline-block;
    width: 100%;
    
    ${Img} {
        padding-right: 6px;
    }
    
    ${Img}:last-child {
        padding-right: 0;
    }
`;

const ImageGroup: React.StatelessComponent<ImageGroupProps> = ({ images, dimensions, maxHeight }) => {
    let imageIndex = 0;
    return (
        <div>
            {dimensions.map((rowDimensions: ImageDimensions[], index: number) => (
                <ImageWrapper key={index}>
                    {rowDimensions.map((dim: ImageDimensions) => {
                        const i = images[imageIndex];
                        imageIndex += 1;
                        return (
                            <Img
                                key={i.id}
                                src={`${i.url}?h=${maxHeight}`}
                                height={dim.height}
                                {...(dim.height > maxHeight ? {} : { width: dim.width })}
                            />
                        );
                    })}
                </ImageWrapper>
            ))}
        </div>
    );
};

export default ImageGroup;
