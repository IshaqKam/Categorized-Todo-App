interface ICategory {
  _id: string;
  name: string;
  todos: ITodo[];
}

interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  category: string;
  subtasks: ISubTask[];
}

interface ISubtask {
  _id: string;
  title: string;
  completed: boolean;
  todo: string;
}

interface CategoryCardProps {
  category: ICategory;
  index: number;
  expandedIndex: number;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  handleExpandClick: (index: number) => void;
  handleAddTask: (categoryId: string) => Promise<void>;
  handleCheckBox: (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    todo: boolean
  ) => Promise<void>;
}
