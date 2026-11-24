type DashboardProps = {
    todos: {
        id: number;
        title: string;
        priority: number;
        deadline: string;
        completed: boolean;
    }[];
};

function Dashboard({ todos }: DashboardProps) {
    const totalCount = todos.length;
    const today = new Date();
    const nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    const completedCount = todos.filter(
    (todo) => todo.completed
    ).length;

    const incompleteTodos = todos.filter(
    (todo) => !todo.completed
    );

    return (
        <section>
            <h2>Dashboard</h2>
            <p>全タスク：{totalCount}件</p>
            <p>完了：{completedCount}件</p>
            <p>未完了：{incompleteTodos.length}件</p>
            <h3>未完了のタスク</h3>
            {incompleteTodos.map((todo) => (
                <p key={todo.id}>
                    {todo.title}（期限：{todo.deadline}）
                </p>
            ))}
        </section>
    );
}

export default Dashboard;
