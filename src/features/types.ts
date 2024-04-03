

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

export interface Tag {
    collectives?: [
        {
            tags: string[],
            external_links: [
                {
                    type: string,
                    link: string
                }
            ],
            description: string,
            link: string,
            name: string,
            slug: string
        }
    ],
    has_synonyms: boolean,
    is_moderator_only: boolean,
    is_required: boolean,
    count: number,
    name: string
}