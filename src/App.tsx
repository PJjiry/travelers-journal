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
import Login from './pages/Login/Login.tsx';
import AuthWrapper from './components/AuthWrapper/AuthWrapper.tsx';
import AllProviders from './AllProviders.tsx';

// Main component of the application, it contains all the routes and context providers
function App() {
    return (
        <AllProviders> {/*Wrapper for all the context providers...provides the context*/}
            <Routes>
                <Route path="/login" element={<Login/>}/> {/*Route for the login page*/}
                <Route path="*" element={
                    <AuthWrapper> {/*Wrapper for the authenticated routes...provides the authentication*/}
                        <Header/> {/*Header component*/}
                        <NavBar/> {/*Navigation bar component*/}
                        <Routes>
                            <Route path="/" element={<Main/>}
                                   index/> {/*Route for the main page...places grouped in continents*/}
                            <Route path="/new-place" element={
                                <NewPlace/>}/> {/*Route for adding a new place...form to add a new place*/}
                            <Route path="/packing-list" element={
                                <PackingList/>}/> {/*Route for the packing list...list of items to pack*/}
                            <Route path="/edit-place/:id" element={
                                <EditPlace/>}/> {/*Route for editing a place...place info and form to edit a place*/}
                            <Route path="/about" element={
                                <About/>}/> {/*Route for the about page...info about the app*/}
                            <Route path="*" element={
                                <Error/>}/> {/*Route for the error page...error message*/}
                        </Routes>
                        <Footer/> {/*Footer component*/}
                    </AuthWrapper>
                }/>
            </Routes>
        </AllProviders>
    )
}

export default App