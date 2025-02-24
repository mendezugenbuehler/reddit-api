import { useState, useEffect } from 'react'
import Post from './components/Post'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [url, setUrl] = useState('https://www.reddit.com/r/programmerhumor.json');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data.data.children);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [url]);
  // Dependency array

  return (
    <>
      <input
        type="text"
        placeholder="Search for a different subreddit..."
        onChange={(e) => setUrl(`https://www.reddit.com/r/${e.target.value}.json`)}
      />
      <h2>Welcome to {url} page</h2>
      <div className="posts-container">
        {posts.length > 0 && (
          <Post
            key={posts[counter].data.id}
            title={posts[counter].data.title}
            image={posts[counter].data.url_overridden_by_dest}
            text={posts[counter].data.selftext}
            permalink={posts[counter].data.permalink}
            
          />
        )}
      </div>
      {counter > 0 && (
        <button onClick={() => setCounter((prevCounter) => (prevCounter - 1))}>Prev</button>
      )}
      <button onClick={() => setCounter((prevCounter) => (prevCounter + 1) % posts.length)}>Next</button>
    </>
  )
}

export default App
