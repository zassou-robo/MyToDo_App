import Header from './Header.tsx'
import TodoItem from './TodoItem.tsx';
import useState from 'react'


// const todos = [
//   {
//     id: 1,
//     title: "レポート提出",
//     priority: 1,
//     deadline: "2026-11-20",
//   },
//   {
//     id: 2,
//     title: "ロボット製作",
//     priority: 2,
//     deadline: "2026-11-25",
//   },
//   {
//     id: 3,
//     title: "課題の確認",
//     priority: 3,
//     deadline: "2026-11-30",
//   },
// ];
const [title, setTitle] = useState("");

function App() {
  return (
    <main>
      <Header title = "MyTodoApp" task_amount={5}/>
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="タスク名を入力"/>
    </main>
  );
}
export default App;