"use client"

type TodoItemProps = {
    id: string
    title: string
    complete: Boolean
    toggleTodo: (id: string, complete: boolean) => void
    removeTodo: (id: string) => void
}

export function TodoItem({ id, title, complete, toggleTodo, removeTodo }: TodoItemProps) {
    return (
    <li classname="flex gap-1 items-center">
        <input id={id} type="checkbox" className="cursor-pointer peer" 
        defaultChecked={complete}
        onChange={e => toggleTodo(id, e.target.checked)}
        />
        <label htmlFor={id} 
        className="cursor-pointer peer-checked:line-through">
            {title}
        </label>
        <button onClick={() => removeTodo(id)}
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
                Remove
            </button>
    </li>
    );
}