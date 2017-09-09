import { Asset, createClient, CreateClientParams, Entry } from 'contentful';

const space: string = process.env.CONTENTFUL_SPACE_ID!;
const accessToken: string = process.env.CONTENTFUL_ACCESS_TOKEN!;

const clientParams: CreateClientParams = {
    space,
    accessToken,
};

const client = createClient(clientParams);

interface EntryLink {
    sys: {
        type: 'Link';
        linkType: 'Entry';
        id: string;
    };
}

interface AssetLink {
    sys: {
        type: 'Link';
        linkType: 'Asset';
        id: string;
    };
}

interface ImageGroupEntryFields {
    title: string;
    images: EntryLink[];
}

interface ImageEntryFields {
    title: string;
    image: AssetLink;
}

export interface IImageGroup {
    id: string;
    title: string;
    images: IImage[];
}

export interface IImage {
    id: string;
    title: string;
    url: string;
    details: {
        size: number;
        image: {
            width: number;
            height: number;
        };
    };
}

export async function getImageGroups(): Promise<IImageGroup[]> {
    const entries = await client.getEntries({
        content_type: 'imageGroup',
        order: 'fields.order',
    });

    type IdToEntry = { [key: string]: Entry<ImageEntryFields> };
    type IdToAsset = { [key: string]: Asset };

    const includedEntries: Entry<ImageEntryFields>[] = entries.includes.Entry;
    const imageEntries: IdToEntry = includedEntries.reduce(
        (prev: IdToEntry, e: Entry<ImageEntryFields>) => {
            prev[e.sys.id] = e;
            return prev;
        },
        {},
    );

    const includedAssets: Asset[] = entries.includes.Asset;
    const imageAssets: IdToAsset = includedAssets.reduce(
        (prev: IdToAsset, a: Asset) => {
            prev[a.sys.id] = a;
            return prev;
        },
        {},
    );

    return entries.items.map((entry: Entry<ImageGroupEntryFields>) => ({
        id: entry.sys.id,
        title: entry.fields.title,
        images: entry.fields.images.map<IImage>((imageLink: EntryLink) => {
            const entryId = imageLink.sys.id;
            const entry = imageEntries[entryId];
            const asset = imageAssets[entry.fields.image.sys.id];
            return {
                id: asset.sys.id,
                title: entry.fields.title,
                url: asset.fields.file.url,
                details: asset.fields.file.details,
            };
        }),
    }));
}
