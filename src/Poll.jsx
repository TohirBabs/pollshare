/* eslint-disable react/prop-types */
import { useState } from "react";
import { db } from "./firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

export const Poll = ({ polldata, prevVoted, votedPolls, setvotedPolls }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [voted, setvoted] = useState(prevVoted);
  const [pollVotes, setpollVotes] = useState(
    votedPolls[polldata.id] ? [polldata.vote1, polldata.vote2] : [0, 0]
  );
  const totalVotes = pollVotes[0] + pollVotes[1];
  console.log(votedPolls[polldata.id]);
  console.log(pollVotes);
  const handleVote = async (vote) => {
    setIsLoading(true);
    try {
      vote === "vote1"
        ? await updateDoc(doc(db, "polls", polldata.id), {
            vote1: polldata.vote1 + 1,
          })
        : vote === "vote2"
        ? await updateDoc(doc(db, "polls", polldata.id), {
            vote2: polldata.vote2 + 1,
          })
        : null;
      votedPolls[polldata.id] = vote;
      // Convert the array to a JSON string and store it in localStorage
      localStorage.setItem("userVotedPolls", JSON.stringify(votedPolls));

      // Update the state
      setvotedPolls(votedPolls);

      vote === "vote1"
        ? setpollVotes([polldata.vote1 + 1, polldata.vote2])
        : vote === "vote2"
        ? setpollVotes([polldata.vote1, polldata.vote2 + 1])
        : null;
      console.log("Data added to Firestore");
      setvoted(true);
      setIsLoading(false);

      // setmodal(false);
    } catch (error) {
      alert("couldn't vote: something went wrong");
      console.error("Error adding document: ", error);
      setIsLoading(false);
    }
  };

  const recordVote = (pollId, vote) => {
    // Create a new item
    const votedPoll = { [pollId]: vote };

    // Retrieve the existing array from state
    const updatedvotes = { ...votedPolls, votedPoll };

    // Update the state
    setvotedPolls(updatedvotes);

    // Convert the array to a JSON string and store it in localStorage
    localStorage.setItem("userVotedPolls", JSON.stringify(updatedvotes));
  };
  return (
    <div
      className={`max-w-[340px] w-full bg-${polldata.theme}-400 rounded-[2.2rem] p-2 flex flex-col gap-4`}
    >
      {polldata.question && (
        <p className="text-2xl font-medium p-2">{polldata.question}</p>
      )}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => !voted && handleVote("vote1")}
          className="w-full h-14  rounded-full bg-black bg-opacity-40  relative overflow-hidden"
        >
          {/* {voted && ( */}
          <div
            style={{
              width:
                pollVotes[0] === 0
                  ? "0%"
                  : `${(pollVotes[0] / totalVotes) * 100}%`,
            }}
            className="absolute h-full transition-all duration-500  z-0 top-0 rounded-full w-[47%] bg-black"
          ></div>
          {/* )} */}
          <p className="z-10 relative">{polldata.opt1}</p>
          {voted && (
            <span className="z-10 h-14 top-0 flex items-center absolute right-4 text-xs">{`${Math.round(
              (pollVotes[0] / totalVotes) * 100
            )}%`}</span>
          )}
        </button>
        <button
          onClick={() => !voted && handleVote("vote2")}
          className="w-full h-14  rounded-full bg-black bg-opacity-40  relative overflow-hidden"
        >
          <div
            style={{
              width:
                pollVotes[1] === 0
                  ? "0%"
                  : `${(pollVotes[1] / totalVotes) * 100}%`,
            }}
            className="absolute h-full transition-all duration-500  z-0 top-0 rounded-full w-[47%] bg-black"
          ></div>

          <p className="z-10 relative">{polldata.opt2}</p>
          {voted && (
            <span className="z-10 h-14 top-0 flex items-center absolute right-4 text-xs">{`${Math.round(
              (pollVotes[1] / totalVotes) * 100
            )}%`}</span>
          )}
        </button>
      </div>
    </div>
  );
};
