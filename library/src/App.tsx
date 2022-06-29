import { Button } from './components';

import React from 'react';
import './App.css';

interface Props {
  foo: string;
}

const App: React.FC<Props> = ({ foo }) => (
  <div className="text-3xl">
    skody: {foo}
    <Button label="Button" />
  </div>
);

export default App;
