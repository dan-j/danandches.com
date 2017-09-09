import React from 'react';
import { IImage, IImageGroup } from '../services/api';

interface ImageGroupProps {
    group: IImageGroup;
    expanded: boolean;
}

export default class ImageGroup extends React.Component<ImageGroupProps, {}> {

    render() {
        const group = this.props.group;
        return (
            <section>
                <h4>{group.title}</h4>
                <pre>{!this.props.expanded && 'not '} expanded</pre>
                <p>Total images: {group.images.length}</p>
                <p>{group.images.map((i: IImage) => i.title).join(', ')}</p>
            </section>
        );
    }
}
