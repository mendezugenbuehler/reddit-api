import React, { useEffect } from 'react';


function Post({ title, image, text, permalink}) {
  const [upvotes, setUpvotes] = React.useState(0);

  useEffect(() => {
    async function fetchUpvotes() {
      try {
        const cleanedPermalink = permalink.endsWith('/') ? permalink.slice(0, -1) : permalink;
        // Blocked by CORS
        const response = await fetch(`https://reddit.com${cleanedPermalink}.json`);
        const data = await response.json();
        const post = data[0].data.children[0].data;
        setUpvotes(post.score);
      } catch (error) {
        console.error('Error fetching upvotes:', error);
      }
    }

    fetchUpvotes();
  }, [permalink]);
  return (
    <div className="post">
      <h3>{title}</h3>
      {image && <img src={image} alt={title} />}
      <p>{!image && text}</p>
      <h4>Upvotes: {upvotes} </h4>
    </div>
  );
}

export default Post;
