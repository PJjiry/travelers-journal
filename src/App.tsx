import {Route, Routes} from "react-router-dom"
import PackingList from './pages/PackingList/PackingList.tsx';
import NewPlace from './pages/NewPlace/NewPlace.tsx';
import Main from './pages/Main/Main.tsx';
import EditPlace from './pages/EditPlace/EditPlace.tsx';
import About from './pages/About/About.tsx';
import Header from './components/Header/Header.tsx';
import NavBar from './components/NavBar/NavBar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Error from './pages/Error/Error.tsx';
import {GoogleMapsProvider} from './store/GoogleMapsContext.tsx';
import {PlacesProvider} from './store/PlacesContext.tsx';
import {CurrentPlaceProvider} from './store/CurrentPlaceContext.tsx';
import {PlaceFormProvider} from './store/PlaceFormContext.tsx';
import {PackingListProvider} from './store/PackingListContext.tsx';
import Login from './pages/Login/Login.tsx';
import AuthWrapper from './components/AuthWrapper/AuthWrapper.tsx';

function App() {
    return (
        <>
            <PlacesProvider>
                <PlaceFormProvider>
                    <CurrentPlaceProvider>
                        <GoogleMapsProvider>
                            <PackingListProvider>
                                <Routes>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="*" element={
                                        <AuthWrapper>
                                            <Header/>
                                            <NavBar/>
                                            <Routes>
                                                <Route path="/" element={<Main/>} index/>
                                                <Route path="/new-place" element={<NewPlace/>}/>
                                                <Route path="/packing-list" element={<PackingList/>}/>
                                                <Route path="/edit-place/:id" element={<EditPlace/>}/>
                                                <Route path="/about" element={<About/>}/>
                                                <Route path="*" element={<Error/>}/>
                                            </Routes>
                                            <Footer/>
                                        </AuthWrapper>
                                    }/>
                                </Routes>
                            </PackingListProvider>
                        </GoogleMapsProvider>
                    </CurrentPlaceProvider>
                </PlaceFormProvider>
            </PlacesProvider>
        </>
    )
}

export default App