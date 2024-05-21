import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const DeletePost = () => {
  const [id, setId] = useState("");
  const mutation = useMutation({
    mutationFn: (deletedPost) => {
      return axios.delete(`http://localhost:4000/users/${deletedPost.id}`);
    },
  });

  const deleteData = () => {
    const deletedPost = {
      id: id,
    };
    mutation.mutate(deletedPost);
  };

  if (mutation.isLoading) {
    return <span>Deleting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post deleted!</span>;
  }

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
      />
      <button onClick={deleteData}>Delete Post</button>
    </div>
  );
};

export default DeletePost;
