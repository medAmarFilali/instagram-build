import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
