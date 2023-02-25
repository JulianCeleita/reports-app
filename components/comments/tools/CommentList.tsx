import React from "react";

interface TodoCardProps {
  children: React.ReactNode;
  edit: string | null;
  handleAddEdit: (key: string) => () => void;
  edittedValue: string;
  setEdittedValue: React.Dispatch<React.SetStateAction<string>>;
  todoKey: string;
  handleEditTodo: () => void;
  handleDelete: (key: string) => () => void;
}

export default function CommentList(props: TodoCardProps) {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
  } = props;

  return (
    <div className="flex">
      <button className="flex-1 text-left duration-300 hover:bg-slate-700 cursor-pointer select-none">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            className="bg-slate-700 flex-1 text-white outline-none "
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
      </button>


{/* MOVE TO DESCRIPTION COMPONENT */}

      <div className="flex items-center bg-orange-400">
        {edit === todoKey ? (
          <i
            onClick={handleEditTodo}
            className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={handleAddEdit(todoKey)}
            className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
          ></i>
        )}
        <i
          onClick={handleDelete(todoKey)}
          className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
        ></i>
      </div>
    </div>
  );
}
