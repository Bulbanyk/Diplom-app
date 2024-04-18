import { AppBar, Toolbar, Button, Stack} from "@mui/material"
import App from "../../App.jsx";
import ImageEl from "../../components/utils/ImageEl.jsx";
import LogoImg from "../../assets/logo.svg"
import LogoutIcon from "@mui/icons-material/ExitToApp.js"

const TopBar = ({openModal}) => {
    return (
        <AppBar position="static">
            <Toolbar sx={{
                justifyContent: "space-between",
            }}>
                <ImageEl sx={{
                    height: "25px",
                }} src={LogoImg} alt="FlowBoard" />
                <Stack direction="row" spacing={2}>
                    <Button onClick={openModal} variant="contained">
                        Create board
                    </Button>
                    <Button startIcon={<LogoutIcon />} color="inherit">
                        Logout
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;