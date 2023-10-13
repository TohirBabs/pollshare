import { useState } from "react";
import { Poll } from "./Poll";

function App() {
  const [modal, setmodal] = useState(false);
  const [theme, settheme] = useState("red");
  return (
    <>
      <div className="w-screen p-2 bg-black min-h-screen flex justify-center items-center flex-col gap-4 py-4">
        <p className="font-bold text-4xl">pollshare</p>
        <Poll
          theme="red"
          question="are you a boy or a girl?"
          options={["boy", "girl"]}
          votes={[35, 16]}
        />
        <Poll
          theme="green"
          question="how often do you treat yourself to a good time?"
          options={["once a month", "never"]}
          votes={[12, 66]}
        />
        <Poll
          theme="yellow"
          question="who is the funnier nigerian comedian?"
          options={["basketmouth", "alibaba"]}
          votes={[24, 14]}
        />
        <Poll
          theme="blue"
          question="which phone brand would you feel most comfortable sticking to forever?"
          options={["apple iphone", "google pixel"]}
          votes={[3, 7]}
        />

        <button
          onClick={() => setmodal(true)}
          className="sticky bottom-5 z-40  bg-white rounded-full font-bold p-4 px-10 text-black"
        >
          🖋share a poll
        </button>
      </div>
      <div
        style={{ height: `${modal ? "420px" : "0"}` }}
        className="sticky transition-all duration-300 w-screen overflow-hidden  bottom-0 z-50 h-0 bg-white  font-bold  flex flex-col items-center  text-black"
      >
        <div className="flex gap-2 p-2 w-full max-w-[360px]">
          <button
            onClick={() => setmodal(false)}
            className=" border-2 border-black rounded-full font-bold p-3 px-6"
          >
            back
          </button>
          <div className="h-full flex-1 border-2 border-black rounded-full flex items-center p-2 gap-2 justify-between">
            <button
              onClick={() => settheme("red")}
              className="w-10 h-10 rounded-full bg-red-400"
            ></button>
            <button
              onClick={() => settheme("yellow")}
              className="w-10 h-10 rounded-full bg-yellow-400"
            ></button>
            <button
              onClick={() => settheme("blue")}
              className="w-10 h-10 rounded-full bg-blue-400"
            ></button>
            <button
              onClick={() => settheme("gray")}
              className="w-10 h-10 rounded-full bg-gray-400"
            ></button>
            <button
              onClick={() => settheme("green")}
              className="w-10 h-10 rounded-full bg-green-400"
            ></button>
          </div>
        </div>
        <div
          className={` w-full max-w-[360px] m-2  bg-${theme}-400 rounded-[2.2rem] p-3 flex flex-col gap-5  `}
        >
          <textarea
            className="resize text-2xl font-medium p-2 h-20 bg-transparent"
            placeholder="poll question"
          />
          <div className="flex flex-col gap-3">
            <input
              placeholder="option 1"
              className="w-full h-14  rounded-full bg-black  text-center relative overflow-hidden"
            />
            <input
              placeholder="option 2"
              className="w-full h-14  rounded-full bg-black  text-center relative overflow-hidden"
            />
          </div>
        </div>

        <button
          onClick={() => setmodal(true)}
          className=" bg-black rounded-full m-2 font-bold p-4 px-20 text-white"
        >
          share
        </button>
      </div>
    </>
  );
}

export default App;
