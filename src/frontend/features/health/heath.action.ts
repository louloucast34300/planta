'use server'






export const apiConnect = async (): Promise<{ok:boolean}> => {
    const url = new URL('/plants', process.env.API_URL);
    const response = await fetch(url, { method:'GET' });
    const data = await response.json()
    if(!data) return {ok:false}
    return data;
}


