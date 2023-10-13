import { useState } from "react";
import { Poll } from "./Poll";
import { PollForm } from "./PollForm";

function App() {
  const [modal, setmodal] = useState(false);

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
          theme="red"
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
      <PollForm modal={modal} setmodal={setmodal} />
    </>
  );
}

export default App;
