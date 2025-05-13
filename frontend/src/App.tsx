import { Button } from 'primereact/button';
import Home from './Components/LandingPage/Home';
import About from './Components/LandingPage/About'
import Image from './Components/LandingPage/Image'
import Audio_test from './Components/Audio_test'
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp'
import DPrimetest from './Components/DragAndDrop/DPrimetest';
import { ScrollTop } from 'primereact/scrolltop';
import Contact from './Components/LandingPage/Contact';

import './App.css';
import Testimonals from './Components/LandingPage/Testimonals';

function App() {
  return (
    <div className="App">
     {/* <Button label="Submit" icon="pi pi-check"/> */}
     <Home/>
     <About/>
     <Image/>
     <ScrollTop />
     <Testimonals/>
     <Contact/>
     {/* <Audio_test/> */}
     {/* <Login/>  */}
     {/* <SignUp/> */}
     {/* <DPrimetest/> */}
    </div>
  );
}

export default App;
