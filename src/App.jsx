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
      setTodos(newtodos);
      saveToLS(newtodos, "todos"); // Save changes to local storage
    }
  };

  const handleEdit = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    setTodo(todos[index].todo);
    let newtodos = [...todos];
    if (index !== -1) {
      newtodos.splice(index, 1);
      setTodo(todos[index].todo);
      setTodos(newtodos);
    }
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
      setTodos(newTodos);
      saveToLS(newTodos, "todos"); // Save changes to local storage
    }
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
      setCompleted(newCompleted);
      compLS(newCompleted, "completed"); // Save changes to local storage
    }
    setTodos(newTds);
  };

  const saveToLS = (data, key) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const compLS = (data, key) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleClear = () => {
    setCompleted([]);
    compLS([], "completed"); // Save changes to local storage
  };

  const handleDelComp = (e) => {
    let newComp = [...completed];
    let id = e.target.name;
    let index = completed.findIndex((item) => {
      return item.id == id;
    });
    if (index !== -1) {
      newComp.splice(index, 1);
      setCompleted(newComp);
      compLS(newComp, "completed"); // Save changes to local storage
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto rounded-2xl bg-slate-300 p-5 h-[82vh] overflow-y-auto flex justify-between">
        <div className="container w-1/2 overflow-y-auto">
          <div className="addTodo">
            <h2 className="text-lg font-bold">Add a task</h2>
            <input
              type="text"
              onChange={onChange}
              value={todo}
              placeholder="Type something to Add"
              name=""
              id=""
              className="w-1/2 p-2 text-slate-500 rounded-md"
            />
            <button
              className="bg-neutral-800 rounded-md font-bold py-[0.4rem] px-2 text-white hover:bg-slate-200 hover:text-black transition-all duration-500 mx-6"
              onClick={handleAdd}
              disabled={!todo}
              style={{ display: !todo ? "none" : "inline" }}
            >
              Add
            </button>
            <button
              onClick={handleHide}
              name="showhiddenbutton"
              className="bg-neutral-800 rounded-md font-bold py-[0.4rem] px-2 text-white hover:bg-slate-200 hover:text-black hover:border-2 hover:border-black transition-all duration-500 mx-6"
            >
              {buttonText}
            </button>
          </div>

          <h1 className="text-lg font-bold inline-block mr-20 m-5">
            Your To-Dos:
          </h1>
          {todos.length == 0 && (
            <div className="m-5">Nothing to display </div>
          )}

          <div className="todos flex justify-between flex-col">
            {todos.map((item) => (
              <div
                className="mapDiv flex justify-between my-2 border border-red-50 p-2 rounded-md bg-slate-300"
                key={item.id}
              >
                <div
                  className="max-w-60 overflow-visible break-words text-ellipsis max-h-20 overflow-y-auto "
                  title={item.todo}
                >
                  {item.todo}
                </div>

                <div className="buttons flex items-center">
                  <button
                    className="bg-neutral-800 rounded-md font-bold  py-[0.1rem] px-2 text-white hover:bg-blue-600  hover:text-white transition-all duration-500 mx-1 max-h-8"
                    onClick={handleEdit}
                    name={item.id}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-neutral-800 rounded-md font-bold py-[0.1rem] px-2 text-white hover:bg-red-500 hover:text-white transition-all duration-500 mx-1 max-h-8"
                    onClick={handleDelete}
                    name={item.id}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-neutral-800 rounded-md font-bold py-[0.2rem] px-2 text-white hover:bg-green-500 hover:text-white transition-all duration-500 mx-1 max-h-8"
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
          className="border border-black text-center w-[35rem] max-h-[28rem] overflow-y-auto rounded-md"
          style={{ display: hide ? "block" : "none" }}
        >
          <div className="flex items-center justify-center ">
            <h2 className="font-bold my-2">Completed Tasks</h2>
          </div>
          {completed.length == 0 && <div>Nothing to display </div>}
          {completed.map((it) => (
            <div
              className="flex items-center justify-between my-2  border border-black p-2 bg-slate-200"
              key={it.id}
            >
              <div
                key={it.id}
                className="text-green-500 text-start mx-4 max-w-60 overflow-hidden text-ellipsis max-h-12 overflow-y-auto"
              >
                {it.completedTask}
              </div>
              <div>
                <button
                  className="bg-black hover:border hover:border-blue-500 rounded-md font-bold font-2xl py-[0.2rem] px-2 text-white hover:bg-white hover:text-blue-600 transition-all duration-500"
                  onClick={handleIncomplete}
                  name={it.id}
                  title="Mark as incomplete"
                >
                  Incomplete
                </button>
                <button
                  className="mx-1 bg-black rounded-md font-bold font-2xl py-[0.2rem] px-2 text-white hover:bg-white hover:text-red-600 hover:border hover:border-red-800 transition-all duration-500"
                  title="Delete completed task"
                  name={it.id}
                  onClick={handleDelComp}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-neutral-800 rounded-md font-bold py-[0.1rem] px-2 text-white  hover:text-red-600 hover:bg-white transition-all duration-500hover:text-black duration-500 mx-auto"
            style={{ display: completed.length > 0 ? "block" : "none" }}
            onClick={handleClear}
            title="Clear the completed Tasks"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
