import {Grid, IconButton, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline.js";
import Task from "./Task.jsx";
import {memo} from "react";
import Droppable from "../../components/utils/StrictModeDroppable.jsx";

const BoardTab = ({
  name,
  tasks,
  status,
  openAddTaskModal,
  removeTask,
  openShiftTaskModal
}) => {
  console.log('Tab: ', name);
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Grid
          {...provided.droppableProps}
          ref={provided.innerRef}
          item
          xs={12}
          sm={4}
        >
        <Stack p={3} bgcolor="#000">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight={400} variant="h6">
              {name}
            </Typography>
            <IconButton onClick={() => openAddTaskModal(status)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack mt={3} spacing={2}>
            {tasks.map((task, index) => (
              <Task
                onClick={ () =>
                  openShiftTaskModal({
                    text:task.text,
                    index: index,
                    status: status,
                  })
              }
                key={task.id}
                text={task.text}
                id={task.id}
                removeTask={() => removeTask(status, task.id)}
                index={index}
              />
            ))}
          </Stack>
          {provided.placeholder}
        </Stack>
    </Grid>
      )}
    </Droppable>
  );
};

export default memo(BoardTab);