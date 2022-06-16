import { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ post }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, post.id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", post.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, post.id]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <div className="relative h-10 w-10 rounded-full overflow-hidden border p-1 mr-3">
          <Image
            src={post.data().profileImg}
            layout="fill"
            objectFit="contain"
            alt={post.data().username}
          />
        </div>
        <p className="flex-1 font-semi-bold">{post.data().username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Image */}
      {!post.data().image ? (
        <div className="w-full h-[400px] lg:h-[600px] bg-gray-100 text-gray-700 flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="relative w-full h-[400px] lg:h-[600px] ">
          <Image
            src={post.data().image}
            alt={post.data().username}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {/* Buttons */}
      {session && (
        <div className="flex justify-between items-center px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn flex" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-semibold mb-1">
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}{" "}
          </p>
        )}
        <span className="font-semibold mr-1">{post.data().username} </span>
        {post.data().caption}
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <div className="relative h-7 w-7 rounded-full overflow-hidden">
                <Image
                  src={comment.data().userImage}
                  alt={comment.data().username}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="text-sm flex-1">
                <span className="font-semibold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <div>
          <form className="flex items-center p-4">
            <EmojiHappyIcon className="h-7 cursor-pointer " />
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              className="flex-1 border-none focus:ring-0 outline-none"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
