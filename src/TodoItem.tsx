type TodoItemProps = {
  title: string;
  deadline: string;
  priority: number;
};

function Item({title,deadline,priority}: TodoItemProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>優先度：{priority}</p>
      <p>期限：{deadline}</p>
    </div>
  );
}

export default Item;