import { useState } from 'react';
function App() {
  const [starting, setStarting] = useState(true);
  window.onload = () => {
     setTimeout(() => {
      setStarting(false);
      console.log(starting);
    }, 4000);
   }
   console.log(starting);
  
  return (
    <div className="App">
     { starting && <div className="intro"> okay </div>}
     {!starting && <p>odbowboiw</p>}
    </div>
  );
}

export default App;
