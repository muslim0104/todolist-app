import React from "react";
import { Button } from "@mui/material";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions
} from "../../../features/TodolistsList/todolists.reducer";
import { useActions } from "../../hooks";

type PropsType = {
  todolist: TodolistDomainType
}
export const FilterButtons = ({ todolist }: PropsType) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeFilterHandler = ( filter: FilterValuesType) => {
    changeTodolistFilter({ id:todolist.id, filter });
  };

  return (
    <div>

        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          onClick={() => changeFilterHandler( "all")}
          color={"secondary"}
        >All</Button>


        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={() => changeFilterHandler( "active")}
          color={"secondary"}
        >Active</Button>


        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={() => changeFilterHandler( "completed")}
          color={"secondary"}
        >Completed</Button>
      </div>

  );
};

