import { useState } from "react";
import { db } from "./firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export const PollForm = ({ modal, setmodal }) => {
  const themes = ["red", "blue", "green"];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    id: "#",
    theme: "red",
    question: "",
    opt1: "",
    opt2: "",
    vote1: 2,
    vote2: 2,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // Creates a reference to an auto-generated ID

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const newPollRef = await addDoc(collection(db, "polls"), data).then(
        (data) =>
          updateDoc(doc(db, "polls", data.id), {
            id: data.id,
          })
      );
      console.log("Data added to Firestore");
      setIsLoading(false);

      setmodal(false);
    } catch (error) {
      alert("couldn't share: something went wrong");
      console.error("Error adding document: ", error);
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      style={{ height: `${modal ? "420px" : "0"}` }}
      className="sticky transition-all duration-300 w-screen overflow-hidden  bottom-0 z-50 h-0 bg-white rounded-t-[2.5rem] font-bold  flex flex-col items-center justify-center  text-black"
    >
      <div className="flex gap-2 p-2 w-full justify-center max-w-[320px]">
        <button
          type="button"
          onClick={() => setmodal(false)}
          className=" border-2 border-black rounded-full font-bold p-2 px-6"
        >
          back
        </button>
        <div className="grid w-[12rem] grid-cols-3  h-full  border-2 border-black rounded-full  items-center p-1 gap-2 justify-around">
          {themes.map((color, index) => (
            <div key={index}>
              <input
                type="radio"
                name="theme"
                id={color}
                value={color}
                onChange={handleChange}
                className="peer hidden"
              />
              <label
                htmlFor={color}
                className={`block cursor-pointer select-none  rounded-full p-4 text-center peer-checked:border-2 border-black bg-${color}-400 peer-checked:font-bold peer-checked:text-white`}
              ></label>
            </div>
          ))}
        </div>
      </div>
      <div
        className={` w-full max-w-[340px] m-2  bg-${data.theme}-400 rounded-[2.2rem] p-2 flex flex-col gap-4`}
      >
        <textarea
          name="question"
          value={data.question}
          onChange={handleChange}
          className="resize text-2xl font-medium text-white outline-none placeholder:text-white placeholder:text-opacity-70 p-2 h-20 bg-transparent"
          placeholder="poll question?(optional)"
        />
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="opt1"
            value={data.opt1}
            onChange={handleChange}
            required
            placeholder="option 1"
            className="w-full h-14 font-normal  rounded-full bg-black  text-center relative text-white outline-none placeholder:text-opacity-70 placeholder:text-white "
          />
          <input
            type="text"
            name="opt2"
            value={data.opt2}
            onChange={handleChange}
            required
            placeholder="option 2"
            className="w-full h-14 font-normal rounded-full bg-black  text-center relative text-white outline-none placeholder:text-opacity-70 placeholder:text-white "
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className=" bg-black rounded-full m-2 font-bold p-4 px-20 text-white"
      >
        {isLoading ? "sharing ..." : "share"}
      </button>
    </form>
  );
};
