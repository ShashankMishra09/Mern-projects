import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateTodo = () => {
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveTodo = () => {
    const data = {
      todo,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/todos", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create todo</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Todo</label>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveTodo}>
          Make Todo
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
