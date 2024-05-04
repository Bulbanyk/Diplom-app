import { useState } from "react";
import {Container, Stack, TextField, Button, Typography, IconButton, InputAdornment} from '@mui/material'
import LogoImg from "../../assets/logo.svg"
import ImageEl from "../../components/utils/ImageEl.jsx";
import {auth} from "../../firebase.js";
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth"
import useStore from "../../store.js";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; //Иконка скрытия пароля
import VisibilityIcon from '@mui/icons-material/Visibility'; //Иконка показать пароль



const initForm = {
    email: "",
    password: "",
};
const AuthScreen = () => {
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // Состояние для отслеживания видимости  пароля
    const [form, setForm] = useState(initForm);
    const { setToastr } = useStore()
    
    
    const authText = isLogin
        ? "Нет аккаунта?"
        : "Уже есть аккаунт?";

    const handleChange = event =>
        setForm(oldForm => ({
            ...oldForm,
            [event.target.name]:event.target.value,
    }));


    const handleAuth = async () => {
        try {
            setLoading(true);
            if (isLogin) {
                await signInWithEmailAndPassword(auth, form.email, form.password)
            } else {
                await createUserWithEmailAndPassword(auth, form.email, form.password)
            }
        } catch(err){
            const msg = err.code.split('auth/')[1].split('-').join(' ')
            setToastr(msg);
            setLoading(false);
        }
    };
    //Показать пароль
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); // Изменяем состояние для показа/скрытия пароля
    };
    //Показать пароль
    
    return (
    <Container
        maxWidth="xs"
        sx={{
        mt: 8
    }}>
        <Stack mb={5} spacing={4} alignItems='center' textAlign='center'>
            <ImageEl src={LogoImg} alt="Logo" width="25%"/>
            <Typography color="rgba(255,255,255, .6)">
                Визуализируйте свой рабочий процесс для повышения производительности.
                <br />
                Доступ к вашим задачам в любое время и в любом месте
            </Typography>
        </Stack>
        <Stack spacing={2}>
            <TextField
                value={form.email}
                name="email"
                onChange={handleChange}
                label="Email"
            />
            
            <TextField
                value={form.password}
                name="password"
                type={showPassword ? "text" : "password"} // Показываем пароль, если showPassword === true
                onChange={handleChange}
                label="Пароль"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                      </InputAdornment>
                    ),
                }}
            
            />
            <Button
                disabled={loading || !form.email.trim() || !form.password.trim()}
                onClick={handleAuth}
                size = "large"
                variant="contained"
            >
                {isLogin ? "Войти" : "Зарегестрироваться"}
            </Button>
        </Stack>
        <Typography
            sx = {{
                cursor: "pointer",
            }}
            onClick={() => setIsLogin(o => !o)}
            mt={3}
            textAlign="center">
            {authText}
        </Typography>
    </Container>

    );
};

export default AuthScreen