import React, { ChangeEvent, memo } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/TodolistsList/todolists.api";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { useActions } from "../../../../common/hooks";
import { tasksThunks } from "../../tasks.reducer";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;



};

export const Task: React.FC<TaskPropsType> = memo(({task,todolistId}) => {
  const {removeTask,updateTask}=useActions(tasksThunks)
 const removeTaskHandler=()=>{
   removeTask({todolistId,taskId: task.id})
 }

  const updateStatusHandler =(e:ChangeEvent<HTMLInputElement>)=>{
    updateTask({todolistId,taskId:task.id,domainModel:{status:e.currentTarget.checked ? TaskStatuses.Completed :TaskStatuses.New}})
  }

  const updateTitleHandler =(title:string)=>{
    updateTask({todolistId,taskId:task.id,domainModel:{title}})
  }

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={updateStatusHandler} />

      <EditableSpan value={task.title} onChange={updateTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
