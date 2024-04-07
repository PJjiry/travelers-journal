import {Route, Routes} from "react-router-dom"
import PackingList from './pages/PackingList/PackingList.tsx';
import NewPlace from './pages/NewPlace/NewPlace.tsx';
import Main from './pages/Main/Main.tsx';
import EditPlace from './pages/EditPlace/EditPlace.tsx';
import About from './pages/About.tsx';
import Header from './components/Header/Header.tsx';
import NavBar from './components/NavBar/NavBar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Error from './pages/Error/Error.tsx';
import {GoogleMapsProvider} from './store/GoogleMapsContext.tsx';
import {PlacesProvider} from './store/PlacesContext.tsx';
import {CurrentPlaceProvider} from './store/CurrentPlaceContext.tsx';
import {PlaceFormProvider} from './store/PlaceFormContext.tsx';

function App() {

    return (
        <>
            <Header/>
            <NavBar/>
            <PlacesProvider>
                <PlaceFormProvider>
                    <CurrentPlaceProvider>
                        <GoogleMapsProvider>
                            <Routes>
                                <Route path="/" element={<Main/>} index/>
                                <Route path="/new-place" element={<NewPlace/>}/>
                                <Route path="/packing-list" element={<PackingList/>}/>
                                <Route path="/edit-place/:id" element={<EditPlace/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="*" element={<Error/>}/>
                            </Routes>
                        </GoogleMapsProvider>
                    </CurrentPlaceProvider>
                </PlaceFormProvider>
            </PlacesProvider>
            <Footer/>
        </>
    )
}

export default App
