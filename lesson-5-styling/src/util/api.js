// Helper function to add delay (with optional jitter)
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper function for random jitter
function getRandomJitter(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to query the API using fetch with exponential backoff and retry logic
export async function queryApi(searchUrl, query, scrollId = null, attempt = 1) {
    const MAX_RETRIES = 5; // Max retry attempts
    const headers = {
        Authorization: `Bearer ${process.env.REACT_APP_CORE_API_KEY}`,  // Use environment variables for the API key
    };

    // Construct the API URL, including scrollId if paginating
    let url = scrollId
        ? `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scrollId=${scrollId}`
        : `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scroll=true`;

    try {
        const response = await fetch(url, { headers });

        // Handle rate limiting (HTTP 429) by retrying with exponential backoff and jitter
        if (response.status === 429 && attempt <= MAX_RETRIES) {
            const delayTime = Math.min(3000 * Math.pow(2, attempt - 1), 30000) + getRandomJitter(0, 1000);
            console.warn(`Rate limited. Retrying in ${delayTime / 1000} seconds (Attempt ${attempt})...`);
            await delay(delayTime);
            return queryApi(searchUrl, query, scrollId, attempt + 1); // Retry with incremented attempt count
        }

        // Throw an error for other unsuccessful responses
        if (!response.ok) {
            throw new Error(`Failed to fetch results: ${response.statusText}`);
        }

        // Parse the response data as JSON
        const data = await response.json();
        return { data, elapsed: response.elapsed || 0 };
    } catch (error) {
        console.error('API request failed:', error.message);

        // If max retries are reached, return the error message
        if (attempt > MAX_RETRIES) {
            throw new Error('Max retries reached. Failed to fetch results.');
        }

        // Re-throw the error to be handled at the caller level
        throw error;
    }
}

// Function to handle paginated results (scrolling)
export async function scroll(searchUrl, query) {
    let allResults = [];
    let scrollId = null;

    // Loop to keep fetching results until no more are available
    while (true) {
        try {
            const { data } = await queryApi(searchUrl, query, scrollId);

            // If no data or results, break the loop
            if (!data || !data.results || data.results.length === 0) break;

            // Append the results to the accumulated list
            allResults = [...allResults, ...data.results];
            scrollId = data.scrollId; // Update scrollId for the next page
        } catch (error) {
            console.error('Failed to retrieve data:', error.message);
            break;
        }

        // Delay to avoid rate-limiting between requests
        await delay(3000);
    }

    return allResults; // Return all accumulated results
}

// Function to extract necessary information from API results
export function extractInfo(results) {
    if (!Array.isArray(results)) {
        console.error('Expected an array of results');
        return [];
    }

    // Extract relevant fields from each result
    return results.map((result) => {
        const title = result.title || "No title available";
        const description = result.abstract || "No description available";
        const displayLink = result.links.find(link => link.type === 'display')?.url || "#";
        const downloadLink = result.links.find(link => link.type === 'download')?.url || "#";

        return {
            title,
            description,
            displayLink,
            downloadLink,
        };
    });
}
