import { prisma } from "./db"
import { TodoItem } from "./components/Todoitem"
import Link from "next/link"

async function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  const todo = await prisma.todo.findUnique({ where: { id } });
  

  if (!todo) {
    throw new Error(`No todo found with the id: ${id}`);
  }


  await prisma.todo.update({ where: { id }, data: { complete } });
}
  async function removeTodo(id: string) {
    "use server"

    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      throw new Error(`No todo found with the id: ${id}`);
    }


    await prisma.todo.delete({ where: { id } });

  }
    
    export default async function Home() {
      const todos = await getTodos()

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todo List</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}

          />
        ))}
      </ul>
    </>
  );
}