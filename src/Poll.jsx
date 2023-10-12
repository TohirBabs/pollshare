export const Poll = ({ question, options, votes, theme }) => {
  const totalVotes = votes[0] + votes[1];
  return (
    <div
      className={`w-[360px] bg-${theme}-400 rounded-[2.2rem] p-3 flex flex-col gap-5  `}
    >
      <p className="text-3xl font-medium p-2">{question}</p>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full h-14 rounded-full bg-black bg-opacity-40  relative overflow-hidden"
          >
            <div
              style={{ width: `${(votes[index] / totalVotes) * 100}%` }}
              className="absolute h-full   z-0 top-0 rounded-full w-[47%] bg-black"
            ></div>
            <p className="z-10 relative">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
