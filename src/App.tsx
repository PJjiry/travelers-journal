import {Route, Routes} from "react-router-dom"
import PackingList from './pages/PackingList.tsx';
import NewSight from './pages/NewSight.tsx';
import Main from './pages/Main/Main.tsx';
import EditSight from './pages/EditSight.tsx';
import About from './pages/About.tsx';
import Header from './components/Header/Header.tsx';
import NavBar from './components/NavBar/NavBar.tsx';
import Footer from  './components/Footer/Footer.tsx';
import Error from './pages/Error.tsx';

function App() {
  return (
    <>
        <Header />
        <NavBar />
        <Routes>
            <Route path="/" element={<Main />} index/>
            <Route path="/new-sight" element={<NewSight />} />
            <Route path="/packing-list" element={<PackingList />} />
            <Route path="/edit-sight/:id" element={<EditSight />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
    </>
  )
}

export default App
