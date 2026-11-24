type TodoItemProps = {
  title: string;
  deadline: string;
  priority: number;
  onDelete: () => void;
};

function TodoItem({
  title,
  deadline,
  priority,
  onDelete,
}: TodoItemProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>優先度：{priority}</p>
      <p>期限：{deadline}</p>
      <button onClick={onDelete}>削除</button>
    </div>
  );
}


export default TodoItem;