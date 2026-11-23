import Header from './Header.tsx';
import TodoItem from './TodoItem.tsx';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "レポート提出",
      priority: 1,
      deadline: "2026-11-20",
    },
    {
      id: 2,
      title: "ロボット製作",
      priority: 2,
      deadline: "2026-11-25",
    },
    {
      id: 3,
      title: "課題の確認",
      priority: 3,
      deadline: "2026-11-30",
    },
  ]);

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: title,
      priority: 1,
      deadline: deadline,
    };

    setTodos([...todos, newTodo]);
    setDeadline("");
    setTitle("");
  };

  return (
    <main>
      <Header title="MyTodoApp" task_amount={todos.length} />
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="タスク名を入力"/>
      <input value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="期限を入力"/>
      <button onClick={addTodo}>追加</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          deadline={todo.deadline}
          priority={todo.priority}
        />
      ))}
    </main>
  );
}

export default App;