// lib/api.js

export async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  
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