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
    <div className="todo-item">
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
          <button className="btn-save" onClick={handleSave}>保存</button>
          <button
            className="btn-cancel"
            onClick={() => {
              setEditTitle(title);
              setEditDeadline(deadline);
              setEditPriority(priority);
              setIsEditing(false);
            }}
          >キャンセル</button>
        </>
      ) : (
        <>
          <div className="todo-item-main">
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggle}
            />

            <span className={completed ? "todo-title completed" : "todo-title"}>
              {title}
            </span>

            <span className={`priority-badge priority-${priority}`}>
              {priority === 1 ? "高" : priority === 2 ? "中" : "低"}
            </span>
          </div>

          <div className="todo-item-sub">
            <p>期限：{deadline}</p>

            <div className="todo-item-actions">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                編集
              </button>
              <button className="btn-delete" onClick={onDelete}>
                削除
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
