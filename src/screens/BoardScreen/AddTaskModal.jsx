import { useState } from "react";
import {
  Dialog,
  Typography,
  Stack,
  Chip,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader.jsx";
import {priorityColor} from "../../theme.js";

const AddTaskModal = ({ tabName, onClose, addTask }) => {
  const [pColor, setPColor] = useState(0);
  const [text, setText] = useState("");
  
  const handleAddTask = () => {
    if (text.trim() !== "") {
      addTask(text, pColor); // Передаем и текст, и выбранный приоритет в функцию addTask
      setText(""); // Сбрасываем значение поля ввода после добавления задачи
      setPColor("")
    }
  };
  
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">;
      <Stack p={2}>;
        <ModalHeader title="Добавить задачу" onClose={onClose} />
        <Stack mt={3} spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>Статус:</Typography>
            <Chip size="small" label={tabName} />
          </Stack>
          <Stack spacing={1.5} direction='row'>
            <Typography>Приоритет: </Typography>
              {priorityColor.map((pClr, idx) =>
                <Box
                  sx={{
                    cursor: "pointer",
                    border: pColor === idx ? "3px solid #383838" : "none",
                    outline: `2px solid ${pClr}`
                  }}
                  onClick={() => setPColor(idx)}
                  key={pClr}
                  height={25}
                  width={25}
                  backgroundColor={pClr}
                  borderRadius='50%'
              />)};
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
