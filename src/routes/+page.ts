import type { PageLoad } from './$types';

export const load: PageLoad = (url) => {
    return {
        query: url.url.searchParams.get('q') || ""
    }
};