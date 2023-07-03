interface ICategory {
  _id: string;
  name: string;
  todos: ITodo[];
}

interface ITodo {
  _id: string;
  title: string;
  category: string;
  due_date: string;
  completed: boolean;
  subtasks: ISubTask[];
}

interface ISubtask {
  _id: string;
  todo: string;
  title: string;
  completed: boolean;
}

interface CategoryCardProps {
  index: number;
  title: string;
  subtask: string;
  category: ICategory;
  addTodoError: string;
  expandedIndex: number;
  addSubtaskError: string;
  setDate: Dispatch<SetStateAction<null>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setSubtask: Dispatch<SetStateAction<string>>;
  handleExpandClick: (index: number) => void;
  handleAddSubtask: (todoId: string) => Promise<void>;
  handleAddTask: (categoryId: string) => Promise<void>;
  handleCheckBox: (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    todo: boolean
  ) => Promise<void>;
}

interface ItemProps {
  item: { completed: boolean; title: string; _id: string; due_date: string };
  todo: boolean;
  handleCheckBox: (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    todo: boolean
  ) => Promise<void>;
}
