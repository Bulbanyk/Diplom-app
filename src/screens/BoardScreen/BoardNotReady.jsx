import { Button, Stack, Typography } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BoardNotReady = () => {
  const navigate = useNavigate();
  return (
    <Stack textAlign="center" alignItems="center" mt={10}>
      <Typography variant="h5">Похоже ваша доска ещё не готова</Typography>
      <Typography mt={1} mb={2}>
        Иногда это занимает несколько секунд для того, что бы доска была готова для использования
        
        <br /> Попробуйте позже, через несколько секунд
      </Typography>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate("/boards")}
        variant="contained"
      >
        Вернуться
      </Button>
    </Stack>
  );
};

export default BoardNotReady;