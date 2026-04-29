
export interface Track {
    id: string;
    attributes: TrackAttributes;
}

export interface TrackAttributes {
    title: string;
    lyrics?: string;
    attachments: Array<{
        url: string;
    }>;
}

export interface ApiResponse<T> {
    data: T;
}