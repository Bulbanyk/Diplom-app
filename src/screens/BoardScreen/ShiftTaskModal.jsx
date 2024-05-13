import {useState} from "react";
import {Dialog, Typography, Stack, Chip, Button, TextField} from '@mui/material';
import ModalHeader from "../../components/layout/ModalHeader.jsx";
import {priorityMap, statusMap} from "./BoardInterface.jsx";


const ShiftTaskModal = ({onClose, task, shiftTask}) => {
  const [taskStatus, setTaskStatus] = useState(task.status)
  const [taskPriority, setTaskPriority] = useState(task.priority);
  
  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Изменить задачу" onClose={onClose} />
        <Stack my={3} spacing={3}>
          <Stack spacing={1}>
            
            <Typography>Задача: </Typography>
            <TextField
              p={1.5}
              bgcolor="#45474E"
              value={task.text}
            >
            
            </TextField>
            
          </Stack>
          <Stack spacing={1}>
            <Typography>Статус</Typography>
              <Stack direction='row' spacing={1}>
                {Object.entries(statusMap).map(([status, label]) => (
                  <Chip
                    onClick={() => setTaskStatus(status)}
                    variant={taskStatus === status ? "filled" : "outlined"}
                    key={status}
                    label={label}
                  />
                ))}
              </Stack>
          </Stack>
          <Stack>
            <Typography>Приоритет</Typography>
            <Stack direction='row' spacing={1}>
              {Object.entries(priorityMap).map(([priority, label]) => (
                <Chip
                  onClick={() => setTaskPriority(priority)}
                  variant={taskPriority === priority ? "filled" :
                "outlined"}
                  key={priority}
                  label={label}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => shiftTask(taskStatus, taskPriority)} variant="contained">Изменить задачу</Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;