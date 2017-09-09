import React from 'react';
import { IImage, IImageGroup } from '../services/api';
import Img from './common/Img';

interface ImageGroupProps {
    group: IImageGroup;
    expanded: boolean;
}

export default class ImageGroup extends React.Component<ImageGroupProps, {}> {

    render() {
        const { group, expanded } = this.props;
        return (
            <section>
                <h4>{group.title}</h4>
                <p>{group.images.length} Images</p>
                {expanded && (
                    <div>
                        {group.images.map((i: IImage) => (
                            <Img key={i.id} src={`${i.url}?h=200`} />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}
