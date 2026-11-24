
type TodoItemProps = {
  title: string;
  deadline: string;
  priority: number;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;
};

function TodoItem({
  title,
  deadline,
  priority,
  completed,
  onDelete,
  onToggle,
}: TodoItemProps) {
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={onToggle}/>
      <span style={{ textDecoration: completed ? "line-through" : "none",}}> {title} </span>
      <p>優先度：{priority}</p>
      <p>期限：{deadline}</p>
      <button onClick={onDelete}>
        削除
      </button>
    </div>
  );
}

export default TodoItem;
