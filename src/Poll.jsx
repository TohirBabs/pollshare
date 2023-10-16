import { useState } from "react";

export const Poll = ({ question, options, votes, theme, voted }) => {
  const [pollVotes, setpollVotes] = useState([0, 0]);
  const totalVotes = votes[0] + votes[1];
  return (
    <div
      className={`max-w-[340px] w-full bg-${theme}-400 rounded-[2.2rem] p-3 flex flex-col gap-5  `}
    >
      {question && <p className="text-2xl font-medium p-2">{question}</p>}
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setpollVotes(votes)}
            className="w-full h-14  rounded-full bg-black bg-opacity-40  relative overflow-hidden"
          >
            <div
              style={{ width: `${(pollVotes[index] / totalVotes) * 100}%` }}
              className="absolute h-full transition-all duration-500  z-0 top-0 rounded-full w-[47%] bg-black"
            ></div>
            <p className="z-10 relative">{option}</p>
            {pollVotes[0] ? (
              <span className="z-10 h-14 top-0 flex items-center absolute right-4 text-xs">{`${Math.round(
                (votes[index] / totalVotes) * 100
              )}%`}</span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};
