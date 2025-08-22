import React, { useEffect, useRef, useState } from "react";
import todo_icon from '../assets/todo_icon.png';
import TodoItem from "./TodoItem";


export default function Todo(){

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")): []);

    const inputRef = useRef();

    // useRef is used to get a reference to the input element.
    // It allows us to directly access the current value of the input field
    // without needing to manage it through React state.
    // When the ADD button is clicked, we read the value using inputRef.current.value.

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText === ''){
            return null;
        }

        const newTodo = {
            id: Date.now(), // everytime generate a new number
            text: inputText,
            isComplete: false
        }
        setTodoList((prevTodo) => [...prevTodo, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id);
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodoList) => {
            return prevTodoList.map((todo) => {
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])
    return(
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px] rounded-xl">
            
            {/* ----- title ---------- */}
            <div className="flex items-center mt-7 gap-2">
                <img className="w-8" src={todo_icon} alt="" />
                <h1 className="text-4xl font-bold" style={{color: '#24327a'}}>TOD0-List</h1>
            </div>

            {/* ----Input box ------- */}
            <div className="flex items-center my-7 bg-gray-200 rounded-full">
                <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-10 pl-6 pr-2 placeholder:text-[#24327a]" type="text" placeholder="Add your task"/>
                <button onClick={add} className="border-none rounded-full bg-orange-600 w-25 h-10 text-white text-lg font-semi-bold cursor-pointer">ADD</button>
            </div>

            {/* -----Todo List------ */}
            <div>
                {todoList.map((item) => {
                    return <TodoItem key={item.id} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
})}
                
            </div>
        </div>
    )
}