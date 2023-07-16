import React, { FC, memo } from "react";
import { EditableSpan } from "..";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  TodolistDomainType,
  todolistsActions,
  todolistsThunks
} from "../../../features/TodolistsList/todolists.reducer";
import { useActions } from "../../hooks";

type PropsType={
  todolist:TodolistDomainType
}

const TodolistTitle:FC<PropsType> = memo(({todolist}) => {
  const { removeTodolist, changeTodolistTitle } = useActions({ ...todolistsThunks, ...todolistsActions });

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title });
  };

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete/>
        </IconButton>
      </h3>
    </div>
  );
});

export default TodolistTitle;