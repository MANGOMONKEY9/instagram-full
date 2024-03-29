import PostComponent from "./PostComponent";
import React, {useState, useEffect} from 'react';

const PostsContainer = ({ refreshPosts }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const response = await fetch("http://localhost:4000/api/posts");
                const data = await response.json();
                const sortedData = data.sort((a, b) => b.post_id - a.post_id);
                setPosts(sortedData);
            } catch (error) {
                console.log("failed to fetch posts", error);
            }
        };
        fetchPosts();
    },[refreshPosts]);

    return (
        <article>
            {posts.map(post => (
                <PostComponent key={post.post_id} postId={post.post_id} />
            ))}
        </article>
    )
};

export default PostsContainer;