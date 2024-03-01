const key = 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=';

export async function POST() {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'X-API-Key': key,
            'content-type': 'application/json'
        }
    };

    const response = await fetch('https://api.storyprotocol.net/api/v1/policies', options);
    const data = await response.json();

    return Response.json({ data });
}
