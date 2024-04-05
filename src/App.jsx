import {CssBaseline, ThemeProvider} from '@mui/material'
import theme from './theme.js'

const App = ()=>{
    return <ThemeProvider theme = {theme}>
            <CssBaseline />
        </ThemeProvider>;

}

export default App