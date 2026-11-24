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

    const completedCount = todos.filter(
    (todo) => todo.completed
    ).length;

    const incompleteTodos = todos.filter(
    (todo) => !todo.completed
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const upcomingTodos = todos.filter(todo => !todo.completed).filter(todo => {
            const [year, month, day] = todo.deadline.split("-").map(Number);
            const deadlineDate = new Date(year, month - 1, day);
            return deadlineDate >= today && deadlineDate <= nextWeek;
        }).sort((a, b) => a.deadline.localeCompare(b.deadline));

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
            <h3>7日以内が期限のタスク</h3>
            {upcomingTodos.length > 0 ? (
            upcomingTodos.map(todo => (
                <p key={todo.id}>
                {todo.title}（期限：{todo.deadline}）
                </p>
            ))
            ) : (
            <p>7日以内に期限のタスクはありません。</p>
            )}
        </section>
    );
}

export default Dashboard;
