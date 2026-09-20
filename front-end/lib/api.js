// lib/api.js

export async function fetchAPI(query, { variables } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  };
  
  const fetchOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 },
  };

  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    fetchOptions.signal = AbortSignal.timeout(15000);
  }

  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, fetchOptions);

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const errorText = await res.text();
    console.error('WordPress API returned non-JSON response:', errorText.slice(0, 200));
    throw new Error(`WordPress API returned non-JSON response (${res.status}): ${errorText.slice(0, 100)}`);
  }

  const json = await res.json();
  
  if (json.errors) {
    const errorDetails = Array.isArray(json.errors)
      ? json.errors.map((e) => e.message).join('; ')
      : 'Unknown GraphQL Error';
    console.error('WordPress API Error:', errorDetails, json.errors);
    throw new Error(`Failed to fetch API: ${errorDetails}`);
  }
  
  return json.data;
}