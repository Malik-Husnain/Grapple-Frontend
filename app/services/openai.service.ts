const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
const BASE_URL = "https://api.openai.com/v1";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'OpenAI-Beta': 'assistants=v2', // Add this header
};


// This would create thread inside openai chat so that we can push relevant data in it.
export const createThread = async () => {
    const result = await fetch(`${BASE_URL}/threads`, {
        method: "POST",
        headers,
        body: JSON.stringify({}),
    });

    const response = await result.json();
    return response;
};


// For adding/sending messages into openai thread
export const addMessageToThread = async (
    threadId: string,
    content: string
) => {
    const result = await fetch(`${BASE_URL}/threads/${threadId}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            role: "user",
            content,
        }),
    });

    const response = await result.json();
    return response;
};

export const runAssistantOnThread = async (
    threadId: string,
) => {
    const result = await fetch(`${BASE_URL}/threads/${threadId}/messages`, {
        method: "GET",
        headers,
    });

    const response = await result.json();
    return response;
};

// Function to create a run (trigger the assistant)
export const runAssistant = async (threadId: string) => {
    const assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID; // Replace with your actual Assistant ID

    if (!assistantId) {
        console.error("OPENAI_ASSISTANT_ID is not set in environment variables.");
        return null;
    }

    const result = await fetch(`${BASE_URL}/threads/${threadId}/runs`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            assistant_id: assistantId,
        }),
    });

    const response = await result.json();
    return response;
};

// Corrected function to get thread messages
export const getThreadMessages = async (threadId: string) => {
    const result = await fetch(`${BASE_URL}/threads/${threadId}/messages`, {
        method: "GET",
        headers,
    });

    const response = await result.json();
    return response;
};

export const getRunStatus = async (
    threadId: string,
    runId: string
) => {
    const result = await fetch(
        `${BASE_URL}/threads/${threadId}/runs/${runId}`,
        {
            method: "GET",
            headers,
        }
    );

    const response = await result.json();
    return response;
};

export const waitForRunToComplete = async (
    threadId: string,
    runId: string,
    intervalMs = 2000
): Promise<any> => {
    while (true) {
        const statusResponse = await getRunStatus(threadId, runId);
        const status = statusResponse.status;

        if (status === "completed" || status === "failed" || status === "cancelled") {
            return statusResponse;
        }

        await new Promise((res) => setTimeout(res, intervalMs));
    }
};