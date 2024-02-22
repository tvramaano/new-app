import {Route, Routes} from 'react-router-dom'
import Simulator from './pages/simulator/simulator';
import SavedSamples from './pages/saved_samples/saved_samples';

function App() {
  return (
    <>
         <Routes>
            <Route path='/' element = {<Simulator/>}/>
            <Route path='savedSamples' element = {<SavedSamples/>}/>
         </Routes>
        
      </>
     
  );
}

export default App;
