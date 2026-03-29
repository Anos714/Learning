import axios from "axios";
import type { PostRes } from "../types/query";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const QueryExample = () => {
  const API_URL = "https://dummyjson.com/posts";

  //old way of fetching data without react-query

  //   const [posts, setPosts] = useState<PostRes[]>([]);

  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(API_URL);
  //       setPosts(res.data.posts);
  //     } catch (error: any) {
  //       console.error(error.message);
  //       return error;
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  // new way of fetching data with react-query
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data.posts;
    },
  });

  if (isLoading || isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data);

  return (
    // <div>
    //   {posts.length > 0 &&
    //     posts.map((post) => (
    //       <div key={post.id}>
    //         <h1>{post.title}</h1>
    //         <p>{post.body}</p>
    //       </div>
    //     ))}
    // </div>
    <h1>hi</h1>
  );
};
export default QueryExample;
