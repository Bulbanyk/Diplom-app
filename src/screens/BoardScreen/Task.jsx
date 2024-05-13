import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";
import {priorityColor} from "../../theme.js";


const Task = ({ id, text, index, priority, removeTask, onClick }) => {

  
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...(!!onClick ? { onClick: onClick } : {})} // Эта фича перекрывает возможность нажимать на задачу в десктопе
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography
            p={1}
            width="100%"
            border="1px solid"
            borderColor="#777980"
            bgcolor="#45474E"
          >
            {text}
          </Typography>
          <IconButton onClick={removeTask}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;
