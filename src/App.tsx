import { useState, useEffect } from 'react';
import Header from './Header';
import TodoItem from './TodoItem';

type Todo = {
  id: number;
  title: string;
  priority: number;
  deadline: string;
  completed: boolean;
};

const initialTodos: Todo[] = [
  {
    id: 1,
    title: "レポート提出",
    priority: 1,
    deadline: "2026-11-25",
    completed: false,
  },
  {
    id: 2,
    title: "ロボット製作",
    priority: 2,
    deadline: "2026-11-28",
    completed: false,
  },
  {
    id: 3,
    title: "課題の確認",
    priority: 3,
    deadline: "2026-11-30",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos !== null) {
      try {
        return JSON.parse(savedTodos) as Todo[];
      } catch {
        console.error("Todoデータの読み込みに失敗しました");
      }
    }

    return initialTodos;
  });

  const [title, setTitle] = useState("");

  const addTodo = () => {
    if (title.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      priority: 1,
      deadline: "2026-12-01",
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(
      (todo) => todo.id !== id
    );

    setTodos(newTodos);
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  return (
    <main>
      <Header
        title="My Todo App"
        task_amount={todos.length}
      />

      <section>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="タスク名を入力"
        />

        <button onClick={addTodo}>
          追加
        </button>
      </section>

      <section>
        <h2>Todo一覧</h2>

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            deadline={todo.deadline}
            priority={todo.priority}
            completed={todo.completed}
            onDelete={() => deleteTodo(todo.id)}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
