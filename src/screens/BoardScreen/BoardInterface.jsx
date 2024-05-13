import { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import useApp from "../../hooks/useApp.js";
import useStore from "../../store.js";
import { DragDropContext } from "react-beautiful-dnd";
import AppLoader from "../../components/layout/AppLoader.jsx";
import ShiftTaskModal from "./ShiftTaskModal.jsx";

export const statusMap = {
  todos: 'Задачи',
  inProgress: 'В работе',
  completed: 'Выполнено'
};

export const priorityMap = {
  redStatus: 'Высокий',
  yellowStatus: 'Средний',
  greenStatus: 'Низкий'
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [shiftTask, setShiftTask] = useState(null);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();
  
  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status),
    []
  );
  
  const handleOpenShiftTaskModal = useCallback(
    (task) => setShiftTask(task),
    []
  );
  
  console.log({ shiftTask });
  
  const handleShiftTask = async (newStatus, priority) => {
    const oldStatus = shiftTask.status;
    const dClone = structuredClone(tabs);
    
    // Удаляем задачу из массива старого статуса
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);
    
    // Добавляем задачу в массив нового статуса с новым приоритетом
    dClone[newStatus].unshift({ ...task, priority });
    
    try {
      await handleUpdateBoardData(dClone);
      setShiftTask(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleUpdateBoardData = async (dClone) => {
    setLoading(true);
    await updateBoardData(boardId, dClone);
    setTabs(dClone);
    updateLastUpdated();
    setToastr('Доска обновлена!');
  };
  
  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      dClone[tab].splice(taskIdx, 1);
      
      try {
        await handleUpdateBoardData(dClone);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );
  
  const handleAddTask = async (text, priority) => {
    if (!text.trim()) return setToastr('Задача не может быть пустая!');
    const dClone = structuredClone(tabs);
    dClone[addTaskTo].unshift({ text, priority, id: crypto.randomUUID() }); // Добавляем приоритет в объект задачи
    try {
      await handleUpdateBoardData(dClone);
      setAddTaskTo('');
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDnd = async ({source, destination}) => {
    if (!destination) return;
    if(
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    
    const dClone = structuredClone(tabs);
    
    //remove the task from tab 1
    const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);
    
    //add it to the tab 2
    dClone[destination.droppableId].splice(destination.index, 0, draggedTask);
    
    try {
      await handleUpdateBoardData(dClone);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  if(loading) return <AppLoader />;
  
  return(
    <>
      {!!shiftTask && (
        <ShiftTaskModal shiftTask={handleShiftTask} task={shiftTask} onClose={() => setShiftTask(null)} />
      )}
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo('')}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} mt={2} spacing={2}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              status={status}
              tasks={tabs[status]}
              name={statusMap[status]}
              openAddTaskModal={handleOpenAddTaskModal}
              openShiftTaskModal={handleOpenShiftTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
