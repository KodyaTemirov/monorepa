import React from "react";
import "./App.css";

interface Props {
  foo: string;
}

const App: React.FC<Props> = ({ foo }) => (
  <div className="font">skody: {foo}</div>
);

export default App;
