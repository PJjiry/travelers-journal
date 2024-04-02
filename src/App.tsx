import {Route, Routes} from "react-router-dom"
import PackingList from './pages/PackingList.tsx';
import NewPlace from './pages/NewPlace.tsx';
import Main from './pages/Main/Main.tsx';
import EditPlace from './pages/EditPlace.tsx';
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
            <Route path="/new-place" element={<NewPlace />} />
            <Route path="/packing-list" element={<PackingList />} />
            <Route path="/edit-place/:id" element={<EditPlace />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
    </>
  )
}

export default App
