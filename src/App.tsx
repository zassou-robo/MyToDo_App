
import { useState, useEffect } from 'react';
import Header from './Header';
import TodoItem from './TodoItem';
import Dashboard from './Dashboard';

type Todo = {
  id: number;
  title: string;
  priority: number;
  deadline: string;
  completed: boolean;
  note?: string;
};

const initialTodos: Todo[] = [
  {
    id: 1,
    title: "レポート提出",
    priority: 1,
    deadline: "2026-11-25",
    completed: false,
    note: "",
  },
  {
    id: 2,
    title: "ロボット製作",
    priority: 2,
    deadline: "2026-11-28",
    completed: false,
    note: "",
  },
  {
    id: 3,
    title: "課題の確認",
    priority: 3,
    deadline: "2026-11-30",
    completed: false,
    note: "",
  },
];

const DISCORD_WORKER_URL =
  "https://mytodo-discord-notify.mytodo-app.workers.dev/test";

type DiscordEvent = "added" | "completed";

const notifyDiscord = async (
  event: DiscordEvent,
  title: string,
  note: string = ""
) => {
  try {
    const response = await fetch(DISCORD_WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        title,
        note,
      }),
    });

    if (!response.ok) {
      console.error(
        "Discord通知に失敗しました:",
        await response.text()
      );
    }
  } catch (error) {
    console.error("Discord通知エラー:", error);
  }
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos !== null) {
      try {
        const parsedTodos = JSON.parse(savedTodos) as Todo[];

        // 以前のデータにメモ欄がなくても読み込めるようにする
        return parsedTodos.map((todo) => ({
          ...todo,
          note: todo.note ?? "",
        }));
      } catch {
        console.error("Todoデータの読み込みに失敗しました");
      }
    }

    return initialTodos;
  });

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(1);
  const [note, setNote] = useState("");

  const [sortType, setSortType] = useState("priority");
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");

  const addTodo = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (title.trim() === "") return;
    if (deadline.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      priority,
      deadline,
      completed: false,
      note: note.trim(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Discord通知
    void notifyDiscord("added", newTodo.title, newTodo.note);

    setTitle("");
    setDeadline("");
    setPriority(1);
    setNote("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const toggleTodo = (id: number) => {
    const targetTodo = todos.find((todo) => todo.id === id);

    if (!targetTodo) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );

    // 未完了から完了に変更した場合だけ通知
    if (!targetTodo.completed) {
      void notifyDiscord(
        "completed",
        targetTodo.title,
        targetTodo.note
      );
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortType === "priority") {
      return a.priority - b.priority;
    }

    if (sortType === "deadline") {
      return a.deadline.localeCompare(b.deadline);
    }

    if (sortType === "id") {
      return a.id - b.id;
    }

    return 0;
  });

  const filteredTodos = sortedTodos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((todo) => {
      if (filterType === "incomplete") {
        return !todo.completed;
      }

      if (filterType === "completed") {
        return todo.completed;
      }

      return true;
    });

  const updateTodo = (
    id: number,
    newTitle: string,
    newDeadline: string,
    newPriority: number,
    newNote: string
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: newTitle,
              deadline: newDeadline,
              priority: newPriority,
              note: newNote,
            }
          : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="app-container">
      <Header
        title="My Todo App"
        task_amount={todos.length}
      />

      <Dashboard todos={todos} />

      {/* タスク追加 */}
      <section className="todo-form">
        <h2>タスク追加</h2>

        <form onSubmit={addTodo}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="タスク名を入力"
          />

          <input
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />

          <select
            value={priority}
            onChange={(event) =>
              setPriority(Number(event.target.value))
            }
          >
            <option value={1}>高</option>
            <option value={2}>中</option>
            <option value={3}>低</option>
          </select>

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="メモ（任意）"
            rows={3}
          />

          <button className="btn-add" type="submit">
            追加
          </button>
        </form>
      </section>

      {/* 検索・フィルター・ソート */}
      <section className="todo-controls">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="タスク名で検索"
        />

        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
        >
          <option value="all">すべて</option>
          <option value="incomplete">未完了のみ</option>
          <option value="completed">完了済みのみ</option>
        </select>

        <select
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
        >
          <option value="priority">優先度順</option>
          <option value="deadline">期限順</option>
          <option value="id">登録順</option>
        </select>
      </section>

      {/* Todo一覧 */}
      <section className="todo-list">
        <h2>Todo一覧</h2>

        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              deadline={todo.deadline}
              priority={todo.priority}
              completed={todo.completed}
              note={todo.note ?? ""}
              onDelete={() => deleteTodo(todo.id)}
              onToggle={() => toggleTodo(todo.id)}
              onUpdate={(
                newTitle,
                newDeadline,
                newPriority,
                newNote
              ) =>
                updateTodo(
                  todo.id,
                  newTitle,
                  newDeadline,
                  newPriority,
                  newNote
                )
              }
            />
          ))
        ) : (
          <p>該当するタスクはありません。</p>
        )}
      </section>
    </main>
  );
}

export default App;
