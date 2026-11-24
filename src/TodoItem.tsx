
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
  const priorityColor =
    priority === 1 ? "red" :
    priority === 2 ? "orange" :
    "blue";
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={onToggle}/>
      <span style={{ textDecoration: completed ? "line-through" : "none",}}> {title} </span>
      <p style={{ color: priorityColor }}>優先度：{ priority === 1 ? "高" : priority === 2 ? "中" : "低" }</p>
      <p>期限：{deadline}</p>
      <button onClick={onDelete}>
        削除
      </button>
    </div>
  );
}

export default TodoItem;
