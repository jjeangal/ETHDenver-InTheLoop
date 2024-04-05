const key = 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=';

export async function POST() {
    const response = await fetch("https://api.storyprotocol.net/api/v1/transactions", {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            options: {
                pagination: { limit: 20 },
                where: {
                    actionType: 'Create'
                }
            }
        })
    });
    const data = await response.json();

    return Response.json({ data });
}