import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    state = {}
    render() {
        const { items, clearList, handleDelete, handleEdit } = this.props; //utilisation du destructuring
        return (
            <>
                <ul className="list-group my-5">
                    <h3 className="text-capitalize text-center">todo list</h3>
                    { //on loop autour de la props items et on passe de nouveau les props au composant enfant TodoItem
                        items.map(item => {
                            return (
                                <TodoItem
                                    key={item.id}
                                    title={item.title}
                                    handleDelete={() => handleDelete(item.id)}//besoin d'utiliser l'id sur cette méthode
                                    handleEdit={() => handleEdit(item.id)}
                                />
                            )
                        })
                    }
                    <button className="btn btn-danger btn-block text-capitalize mt-5" type="button" onClick={clearList}>clear list</button>
                </ul>
            </>
        );
    }
}

export default TodoList;