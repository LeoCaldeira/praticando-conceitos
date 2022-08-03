import React, { useState, useEffect } from 'react';
import Done from '../../assets/Checked.svg';
import Trash from '../../assets/Trash.svg';
import TrashIcon from '../../assets/TrashIcon';
import './Todo.scss';

export interface Todos {
    title: string,
    id: string,
    isDone: boolean,
}

export interface TodoI extends Todos {
    handleRemove(id: string): void;
    handleCheck(id: string): void;
}

const Todo = (props: TodoI) => {
    const { title, id, isDone, handleCheck, handleRemove } = props

    return (
        <div key={id} className="todo-wrapper">
            <div className={`${!isDone ? "radio-button" : ""}`} onClick={() => handleCheck(id)}>
                {isDone && <img src={Done} alt="Done" className="image-content" />}
            </div>
            <div className={`${isDone ? "title-wrapper" : ""}`}>
                {title}
            </div>
            <div className="remove-todo" onClick={() => handleRemove(id)} >
                <TrashIcon color='' />
            </div>
        </div >
    )
}

export default Todo;