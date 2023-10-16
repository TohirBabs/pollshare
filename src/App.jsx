import { useState } from "react";
import { Poll } from "./Poll";
import { PollForm } from "./PollForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";

function App() {
  const [modal, setmodal] = useState(false);
  const [pollData, setpollData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "polls"));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
        setpollData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(pollData);
  return (
    <>
      <div className="w-screen p-2 bg-black min-h-screen flex justify-center items-center flex-col gap-8 py-4">
        <p className="font-bold text-4xl">pollshare</p>
        {pollData.map((poll, index) => (
          <Poll
            key={index}
            theme={poll.theme || "red"}
            question={poll.question}
            options={[poll.option1, poll.option2]}
            votes={[35, 16]}
          />
        ))}

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
