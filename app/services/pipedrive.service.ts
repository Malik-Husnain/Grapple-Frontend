
// Fetch list of all cases
export const fetchCases = async (limit: number = 10) => {
    const API_KEY = process.env.NEXT_PUBLIC_PIPEDRIVE_API_KEY;
    const result = await fetch(`https://api.pipedrive.com/v1/deals?status=open&limit=${limit}&api_token=${API_KEY}`)
    const response = result.json()
    return response;
}

// Fetch all notes 
export const fetchNotes = async (limit: number = 10) => {
    const API_KEY = process.env.NEXT_PUBLIC_PIPEDRIVE_API_KEY;
    const result = await fetch(`https://api.pipedrive.com/v1/notes?api_token=${API_KEY}`)
    const response = result.json()
    return response;
}

// To fetch notes associated with a deal (aka a case), use this endpoint:
export const fetchNotesForDeal = async (dealId: number) => {
    const token = process.env.NEXT_PUBLIC_PIPEDRIVE_API_KEY;
    const result = await fetch(`https://api.pipedrive.com/v1/deals/${dealId}/notes?api_token=${token}`);
    const response = await result.json();
    return response;
};

