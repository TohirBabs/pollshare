import React from "react";
import { useState } from "react";
import { app } from "./firebase";

export const PollForm = ({ modal, setmodal }) => {
  const [theme, settheme] = useState("red");
  const themes = ["red", "blue", "green"];
  const [data, setData] = useState({
    question: "",
    option1: "",
    option2: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //   const db = app.firestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new Firestore document in a "users" collection
      await db.collection("polls").add(data);
      console.log("Data added to Firestore");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ height: `${modal ? "420px" : "0"}` }}
      className="sticky transition-all duration-300 w-screen overflow-hidden  bottom-0 z-50 h-0 bg-white rounded-t-[2.5rem] font-bold  flex flex-col items-center justify-center  text-black"
    >
      <div className="flex gap-2 p-2 w-full justify-center max-w-[320px]">
        <button
          onClick={() => setmodal(false)}
          className=" border-2 border-black rounded-full font-bold p-2 px-6"
        >
          back
        </button>
        <div className="h-full  border-2 border-black rounded-full flex items-center p-2 gap-2 justify-around">
          {themes.map((color, index) => (
            <button
              key={index}
              onClick={() => settheme(color)}
              className={`w-8 h-8 rounded-full bg-${color}-400 ${
                theme === color && "border-2"
              } border-black`}
            ></button>
          ))}
        </div>
      </div>
      <div
        className={` w-full max-w-[340px] m-2  bg-${theme}-400 rounded-[2.2rem] p-3 flex flex-col gap-5  `}
      >
        <textarea
          name="option1"
          value={data.question}
          className="resize text-2xl font-medium text-white outline-none placeholder:text-white p-2 h-20 bg-transparent"
          placeholder="poll question?"
        />
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="option1"
            value={data.option1}
            onChange={handleChange}
            placeholder="option 1"
            className="w-full h-14  rounded-full bg-black  text-center relative text-white outline-none placeholder:text-white "
          />
          <input
            type="text"
            name="option2"
            value={data.option2}
            onChange={handleChange}
            placeholder="option 2"
            className="w-full h-14  rounded-full bg-black  text-center relative text-white outline-none placeholder:text-white "
          />
        </div>
      </div>

      <button
        type="submit"
        onClick={() => setmodal(true)}
        className=" bg-black rounded-full m-2 font-bold p-4 px-20 text-white"
      >
        share
      </button>
    </form>
  );
};
