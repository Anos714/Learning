import useAddPost from "../hooks/useAddPost";

const Add = () => {
  const { data, isPending, error } = useAddPost();
  return (
    <div>
      <button>Add</button>
    </div>
  );
};
export default Add;
