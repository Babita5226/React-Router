import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const UpdatePost = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: (updatedPost) => {
      return axios.put(
        `http://localhost:4000/users/${updatedPost.id}`,
        updatedPost
      );
    },
  });

  const submitData = () => {
    const updatedPost = {
      id: id,
      title: title,
      body: body,
    };
    mutation.mutate(updatedPost);
  };

  if (mutation.isLoading) {
    return <span>Updating...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post updated!</span>;
  }

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={submitData}>Update</button>
    </div>
  );
};

export default UpdatePost;
