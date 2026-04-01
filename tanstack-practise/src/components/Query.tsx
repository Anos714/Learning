import { useState } from "react";
import useGetPosts from "../hooks/useGetPosts";
import useAddPost from "../hooks/useAddPost";

const QueryExample = () => {
  // const API_URL = "https://dummyjson.com/pos";

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
  // const {
  //   data: postData,
  //   isLoading,
  //   isPending,
  //   error,
  // } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async (): Promise<PostRes[]> => {
  //     const res = await axios.get(API_URL);
  //     return res.data.posts;
  //   },
  //   retry: false, // disable retrying failed requests
  // });

  //by usng hook
  const [userClicked, setUserClicked] = useState(false);
  const { postData, isLoading, error, refetch } = useGetPosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  // console.log(postData);

  const handleUserClick = () => {
    setUserClicked((prev) => !prev);
  };

  //post request

  return (
    <div>
      <button onClick={handleUserClick}>Click Me!</button>
      <button onClick={() => refetch()}>Refetch Data</button>

      {userClicked ? (
        postData &&
        postData.length > 0 &&
        postData.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>{post.views}</p>
          </div>
        ))
      ) : (
        <p>Click button to view posts </p>
      )}
    </div>
  );
};
export default QueryExample;
