import { useEffect } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import {auth} from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth"

const App = ()=>{

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user)
        });

        return () => unsub()
    }, []);
    return (
    <ThemeProvider theme = {theme}>
            <CssBaseline />

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthScreen />} />
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    );
};

export default App