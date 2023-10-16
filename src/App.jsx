import { useState } from "react";
import { Poll } from "./Poll";
import { PollForm } from "./PollForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";

function App() {
  const [modal, setmodal] = useState(false);
  const [pollData, setpollData] = useState([]);
  const [votedPolls, setvotedPolls] = useState({});

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
  }, [modal]);
  console.log(pollData);

  // localStorage.removeItem("userVotedPolls");
  console.log(localStorage.getItem("userVotedPolls"));

  useEffect(() => {
    // Check if the item exists in localStorage
    const userVotedPolls = JSON.parse(localStorage.getItem("userVotedPolls"));

    if (userVotedPolls) {
      // If it exists, set it in the component state
      setvotedPolls(userVotedPolls);
    } else {
      // If it doesn't exist, create it in localStorage
      localStorage.setItem("userVotedPolls", JSON.stringify({}));
      setvotedPolls({});
    }
  }, []);
  console.log(votedPolls);

  return (
    <>
      <div className="w-screen p-2 bg-black min-h-screen flex justify-center items-center flex-col gap-8 py-4">
        <p className="font-bold text-4xl">pollshare</p>
        {pollData.map((poll) => (
          <Poll
            key={poll.id}
            polldata={poll}
            prevVoted={votedPolls[poll.id] ? true : false}
            votedPolls={votedPolls}
            setvotedPolls={setvotedPolls}
          />
        ))}

        <button
          onClick={() => setmodal(true)}
          className="sticky bottom-5 z-40  bg-white rounded-full font-bold p-4 px-10 text-black"
        >
          🖋share a poll
        </button>
      </div>
      <PollForm modal={modal} setmodal={setmodal} prevVoted={false} />
    </>
  );
}

export default App;
