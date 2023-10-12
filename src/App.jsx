import { Poll } from "./Poll";

function App() {
  return (
    <div className="w-screen bg-black min-h-screen flex justify-center items-center flex-col gap-8 py-8">
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
    </div>
  );
}

export default App;
