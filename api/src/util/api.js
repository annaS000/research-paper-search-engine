export async function queryApi(searchUrl, query, scrollId = null) {
    // const headers = {
    //   Authorization: `Bearer ${process.env.REACT_APP_CORE_API_KEY}`,  // API Key from environment variables
    // };
    const headers = {
        Authorization: `Bearer ${"YOUR_API_KEY"}`,  // API Key from environment variables
      };

      let url = scrollId
      ? `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scrollId=${scrollId}`  // Example: limit to 5 results
      : `${searchUrl}?q=${encodeURIComponent(query)}&limit=5&scroll=true`;  
  
    try {
      const response = await fetch(url, { headers });
      
      // Handle 429 Too Many Requests
      if (response.status === 429) {
        console.warn('Too many requests. Retrying after delay...');
        await delay(3000);  // Wait for 3 seconds before retrying
        return queryApi(searchUrl, query, scrollId);  // Retry the request
      }
  
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      
      const data = await response.json();
      return { data, elapsed: response.elapsed || 0 };  // Returning data and elapsed time
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: null, error: error.message };
    }
  }
  

 // Helper function to add a delay between requests
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  export async function scroll(searchUrl, query) {
    let allResults = [];
    let scrollId = null;
    const delayDuration = 3000; // Delay for 3 seconds (3000 ms)

    while (true) {
        const { data, error } = await queryApi(searchUrl, query, scrollId);

        if (error || !data || !data.results) {
            console.error('Failed to retrieve data:', error);
            break;
        }

        scrollId = data.scrollId;
        const results = data.results;
        if (results.length === 0) break;

        // Collect the results
        allResults = [...allResults, ...results];

        // Delay between requests
        await delay(delayDuration);
    }

    return allResults;
}


  export function extractInfo(results) {
    if (!Array.isArray(results)) {
      console.error('Expected an array of results');
      return [];
    }
  
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
  
  
  