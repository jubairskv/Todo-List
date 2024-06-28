import React from 'react'
import "./Todo.css"
import { useState, useRef, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";



const Todo = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [editId, setEditId] = useState(0)

    // const handleInput =(e)=>{
    //     setInput(e.target.value)
    //console.log(e.target.value)
    // }
    const addTodo = () => {
        if (todo !== '') {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }])
            console.log(todos)
            setTodo('');
        }
        if(editId){
            const editInfo = todos.find((data)=>data.id === editId) 
            const updateInfo = todos.map((datas) =>datas.id===editInfo.id ? (datas = {id : datas.id , list : todo}) : (datas={id : datas.id , list : datas.list}))
            setTodos(updateInfo);
            setEditId(0);
            setTodo('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const inputRef = useRef("null")

    useEffect(() => {
        inputRef.current.focus()
        //console.log(inputRef.current)
    })

    const onDelete = (id) => {
        setTodos(todos.filter((data) => data.id !== id))

        //console.log(todos.filter((data) => data.id !== id))
    }

    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id) => {
        const editData = todos.find((data) => data.id === id)
        //console.log("EditId : " , editData.list)
        setTodo(editData.list)
        setEditId(editData.id)
        //console.log(editData)
    }


    // const [car ,setCar] = useState({
    //     color: "red",
    //     year:"1999",
    //     name:"maruti"
    // })

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input type='text' value={todo} ref={inputRef} placeholder='Enter your todo' className='form-control' onChange={(e) => { setTodo(e.target.value) }} />
                <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
            </form>
            <div className='list'>
                <ul>
                    {
                        todos.map((data) => (
                            <li key={data} className='list-items'>
                                <div className='list-item-list' id={data.status ? "list-item" : ''}>{data.list}</div>
                                <span>
                                    <SiTicktick className='list-item-icons' id='complete' title='Complete' onClick={() => onComplete(data.id)} />
                                    <FaRegEdit className='list-item-icons' id='edit' title='Edit' onClick={() => onEdit(data.id)} />
                                    <MdDelete className='list-item-icons' id="delete" title='Delte' onClick={() => onDelete(data.id)} />
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* {car.color}<br/>
      {car.name}<br/>
      {car.year}<br/>
      <button onClick={()=>setCar({...car,color:"blue"})}>Color change</button> */}

        </div>
    )
}

export default Todo
