import { useState } from 'react';
import Opening from './Opening'; 
import {Routes, Route} from "react-router-dom";
import Mainpage from './Mainpage';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
import Home from './home';
import Addpost from './Addpost';
import Postpage from './postpage';
import Bookmark from './bookmark';
import { useContext } from 'react';
import DataContext from './context/datacontext';

function App() {
  const [starting, setStarting] = useState(true);
  const {authUser, username} = useContext(DataContext);
  window.onload = () => {
     setTimeout(() => {
      setStarting(false);
      console.log(starting);
    }, 1500);
  }
  return (
    
    <div className="App">
    
     { starting && <Opening/>}
     
     {!starting &&
     <div>
     <Routes>
   <Route exact path="/" element={<Mainpage/>}></Route>
   <Route exact path="/signup" element={<Signup/>}></Route>
   <Route exact path="/login" element={<Login/>}></Route>
   {authUser && (<>
   <Route exact path="/home" element={<Home/>}></Route>
   <Route exact path="/post" element={<Addpost/>}></Route>
   <Route exact path="/post/:id" element={<Postpage/>}></Route>
   <Route exact path="/bookmark" element={<Bookmark/>}></Route>
   </>)
}
<Route exact path="*" element={<Mainpage/>}></Route>
   </Routes>
   <Footer/>
   </div>
   }

    </div>
   
  );
}

export default App;
