const fetch = require('node-fetch');

async function inspectPosts() {
  const query = `
    query GetPosts {
      posts(first: 100) {
        nodes {
          id
          title
          author {
            node {
              name
              slug
              databaseId
            }
          }
          articleMetadata {
            authorSubtitle
            authorSerial
            author_serial
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://server.freebirdsdigest.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const posts = json.data?.posts?.nodes || [];
    console.log(`Total posts returned: ${posts.length}`);
    posts.forEach((p, idx) => {
      console.log(`[${idx+1}] Title: "${p.title}" | authorSerial: "${p.articleMetadata?.authorSerial}" | author_serial: "${p.articleMetadata?.author_serial}" | WP Author: name="${p.author?.node?.name}", slug="${p.author?.node?.slug}", dbId="${p.author?.node?.databaseId}"`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

inspectPosts();
