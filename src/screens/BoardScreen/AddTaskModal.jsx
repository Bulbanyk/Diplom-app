import { useState } from "react";
import {
  Dialog,
  Typography,
  Stack,
  Chip,
  OutlinedInput,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader.jsx";

const AddTaskModal = ({ tabName, onClose, addTask }) => {
  const [primary, setPrimary] = useState("");
  const handleChange = (event) => {
    setPrimary(String(event.target.value));
  };
  
  const [text, setText] = useState("");
  
  const handleAddTask = () => {
    if (text.trim() !== "") {
      addTask(text, primary); // Передаем и текст, и выбранный приоритет в функцию addTask
      setText(""); // Сбрасываем значение поля ввода после добавления задачи
      setPrimary(""); // Сбрасываем выбранный приоритет после добавления задачи
    }
  };
  
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Добавить задачу" onClose={onClose} />
        <Stack mt={3} spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>Статус:</Typography>
            <Chip size="small" label={tabName} />
          </Stack>
          <Stack>
            <InputLabel id="demo-simple-select-label">Приоритет</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={primary}
              label="Primary"
              onChange={handleChange}
            >
              <MenuItem
                value="redStatus"
                sx={{ bgcolor: "#B20000", color: "#fff", fontWeight: "700" }}
              >
                Красный
              </MenuItem>
              
              <MenuItem
                value="yellowStatus"
                sx={{ bgcolor: "#FFFF00", color: "#000", fontWeight: "700" }}
              >
                Жёлтый
              </MenuItem>
              
              <MenuItem
                value="greenStatus"
                sx={{ bgcolor: "#0a5c0a", color: "#fff", fontWeight: "700" }}
              >
                Зелёный
              </MenuItem>
            </Select>
          </Stack>
          <OutlinedInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Задача"
          />
          <Button onClick={handleAddTask} variant="contained">
            Добавить задачу
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
