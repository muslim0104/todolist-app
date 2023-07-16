import React, { memo } from "react";
import { TodolistDomainType } from "features/TodolistsList/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";
import { TaskType } from "features/TodolistsList/todolists.api";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { FilterButtons } from "../../../common/components/FilterButtons/FilterButtons";
import Tasks from "../Tasks/Tasks";
import styles from "../../../common/components/FilterButtons/FilterButtons.module.css";
import TodolistTitle from "../../../common/components/TodolistTitle/TodolistTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: React.FC<PropsType> = memo(function({todolist}) {
  const { addTask } = useActions(tasksThunks);
  const addTaskHandler = (title: string) => {
    return addTask({ todolistId: todolist.id, title }).unwrap();
  };


  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"}/>
      <div>
        <Tasks todolist={todolist}/>
      </div>
      <div className={styles.filter_buttons_styles}>
        <FilterButtons todolist={todolist}/>
      </div>
    </div>
  );
});
