import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [hide, setHide] = useState(false);
  const [buttonText, setButtonText] = useState("Show Completed");

  useEffect(() => {
    let t = localStorage.getItem("todos");
    if (t) {
      let tds = JSON.parse(localStorage.getItem("todos"));
      setTodos(tds);
    }
    let c = localStorage.getItem("completed");
    if (c) {
      let cpt = JSON.parse(localStorage.getItem("completed"));
      setCompleted(cpt);
    }
  }, []);

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      saveToLS(updatedTodos, "todos");
      return updatedTodos;
    });
    setTodo("");
  };

  const handleDelete = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newtodos = [...todos];
    if (index !== -1) {
      newtodos.splice(index, 1);
    }
    setTodos(newtodos);
    saveToLS(newtodos, "todos");
  };

  const handleEdit = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    setTodo(todos[index].todo);
    let newtodos = [...todos];
    if (index !== -1) {
      newtodos.splice(index, 1);
    }
    setTodo(todos[index].todo);
    setTodos(newtodos);
  };

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    const updatedCompleted = [
      ...completed,
      { id: uuidv4(), completedTask: todos[index].todo },
    ];
    setCompleted(updatedCompleted);
    let newTodos = [...todos];
    if (index !== -1) {
      newTodos.splice(index, 1);
    }
    setTodos(newTodos);
    saveToLS(newTodos, "todos");
    compLS(updatedCompleted, "completed");
  };

  const handleHide = () => {
    setHide(!hide);
    if (!hide) {
      setButtonText("Hide Completed");
    } else {
      setButtonText("Show Completed");
    }
  };

  const handleIncomplete = (e) => {
    let id = e.target.name;
    let index = completed.findIndex((item) => item.id === id);
    let newTds = [...todos];
    if (index !== -1) {
      newTds.push({
        id: uuidv4(),
        todo: completed[index].completedTask,
        isCompleted: false,
      });
    }
    let newCompleted = [...completed];
    if (index !== -1) {
      newCompleted.splice(index, 1);
    }
    setCompleted(newCompleted);
    setTodos(newTds);
    compLS(newCompleted, "completed");
  };

  const saveToLS = (data, key) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const compLS = (data, key) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleClear = () => {
    setCompleted([]);
    setTodos(todos);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="container mx-auto my-2 rounded-2xl  bg-slate-300 p-5 min-h-[100vh] flex justify-between">
          <div className="container w-1/2">
            <div className="addTodo">
              <h2 className="text-lg font-bold">Add a task</h2>
              <input
                type="text"
                onChange={onChange}
                value={todo}
                placeholder="Type something to Add"
                name=""
                id=""
                className="w-1/2 p-1 text-slate-500 rounded-md"
              />
              <button
                className="bg-neutral-800 rounded-md font-bold py-[0.4rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-6 "
                onClick={handleAdd}
                disabled={!todo}
                style={{ display: !todo ? "none" : "inline" }}
              >
                Add
              </button>
              <button
                onClick={handleHide}
                name="showhiddenbutton"
                className="bg-neutral-800 rounded-md font-bold py-[0.4rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-6"
              >
                {buttonText}
              </button>
            </div>

            <h1 className="text-lg font-bold inline-block mr-20">
              Your To-Dos:
            </h1>
            {todos.length == 0 && (
              <div className="m-5">Nothing to display </div>
            )}

            <div className="todos flex justify-between flex-col">
              {todos.map((item) => (
                <div className="mapDiv flex justify-between my-2 border border-red-50 p-2 rounded-md bg-slate-300" key={item.id}>
                  <div
                    className="max-w-60 overflow-hidden text-ellipsis whitespace-nowrap"
                    title={item.todo}
                  >
                    {item.todo}
                  </div>

                  <div className="buttons flex">
                    <button
                      className="bg-neutral-800 rounded-md font-bold py-[0.1rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-1"
                      onClick={handleEdit}
                      name={item.id}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-neutral-800 rounded-md font-bold py-[0.1rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-1"
                      onClick={handleDelete}
                      name={item.id}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-neutral-800 rounded-md font-bold py-[0.1rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-1"
                      type="checkbox"
                      name={item.id}
                      value={todo.isCompleted}
                      id=""
                      onClick={handleCheckbox}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="border border-l-slate-100 text-center w-[19rem] rounded-md"
            style={{ display: hide ? "block" : "none" }}
          >
            <div className="flex items-center justify-center">
              <h2 className="font-bold my-2">Completed Tasks</h2>
            </div>
            {completed.length == 0 && <div>Nothing to display </div>}
            {completed.map((it) => (
              <div
                className="flex items-center justify-between my-2 rounded-sm bg-slate-200"
                key={it.id}
              >
                <div
                  key={it.id}
                  className="text-green-500 text-start mx-4 max-w-60 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {it.completedTask}
                </div>
                <button
                  className="bg-red-600 rounded-md font-bold px-2 text-white hover:bg-white hover:text-red-600 transition-all duration-500"
                  onClick={handleIncomplete}
                  name={it.id}
                  title="Mark as incomplete"
                >
                  ⛌
                </button>
              </div>
            ))}
            <button
              className="bg-neutral-800 rounded-md font-bold py-[0.1rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-auto"
              style={{ display: completed.length > 0 ? "block" : "none" }}
              onClick={handleClear}
              title="Clear the completed Tasks"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
