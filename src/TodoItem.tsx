import { useState } from "react";

type TodoItemProps = {
  title: string;
  deadline: string;
  priority: number;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;

  // 追加
  onUpdate: (
    newTitle: string,
    newDeadline: string,
    newPriority: number
  ) => void;
};

function TodoItem({
  title,
  deadline,
  priority,
  completed,
  onDelete,
  onToggle,
  onUpdate,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDeadline, setEditDeadline] = useState(deadline);
  const [editPriority, setEditPriority] = useState(priority);
  const priorityColor =
    priority === 1 ? "red" :
    priority === 2 ? "orange" :
    "blue";
  const handleSave = () => {
    if (editTitle.trim() === "" || editDeadline === "") {
      return;
    }
    onUpdate(editTitle, editDeadline, editPriority);
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />
          <input
            type="date"
            value={editDeadline}
            onChange={(event) => setEditDeadline(event.target.value)}
          />
          <select
            value={editPriority}
            onChange={(event) => setEditPriority(Number(event.target.value))}
          >
            <option value={1}>高</option>
            <option value={2}>中</option>
            <option value={3}>低</option>
          </select>
          <button onClick={handleSave}>保存</button>
          <button onClick={() => { setEditTitle(title); setEditDeadline(deadline); setEditPriority(priority); setIsEditing(false);}}>キャンセル</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={completed} onChange={onToggle} />
          <span style={{textDecoration: completed ? "line-through" : "none",}}>{title}</span>
          <p style={{ color: priorityColor }}>
            優先度：{priority === 1 ? "高" : priority === 2 ? "中" : "低"}
          </p>
          <p>期限：{deadline}</p>
          <button onClick={() => setIsEditing(true)}>編集</button>
          <button onClick={onDelete}>削除</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
