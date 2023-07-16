import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "../tasks.selectors";
import { TodolistDomainType } from "../todolists.reducer";
import { TaskStatuses } from "../../../common/enums";
import { Task } from "./Task/Task";
import { useActions } from "../../../common/hooks";
import { tasksThunks } from "../tasks.reducer";


type PropsType = {
  todolist: TodolistDomainType
}
const Tasks = memo(({ todolist }: PropsType) => {
  const { fetchTasks,addTask } = useActions(tasksThunks);
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  let allTodolistTasks = tasks[todolist.id];
  let tasksForTodolist = allTodolistTasks;

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
  }
  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
  }

  return (
    <div>
      {tasksForTodolist.map(t => {
        return <Task key={t.id} task={t} todolistId={t.todoListId}/>;
      })}

    </div>
  );
});

export default Tasks;