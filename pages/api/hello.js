// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
async function searchGoogleScholar(query) {
  try {
    // Make a request to the Google Scholar API
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_scholar',
        q: query,
        api_key: 'e6a3c4eea1a5a9ebc1b8df92671e2ad8cd03df75f1ddf8ff8dff32b6828e215e',
      },
    });

    // Get the search results from the response data
    const results = response.data?.organic_results || [];

    // Map the search results to a simplified format
    return results.map((result) => ({
      title: result.title,
      authors: result.authors,
      year: result.publication_info?.year,
      url: result.link,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
export default searchGoogleScholar ;

