import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    items: [],
    id: uuidv4(),
    item: '',
    editItem: false
  }
  //création des différentes méthodes ici car il y a le state

  //méthode 1 : pour inscrire du texte dans l'input (gérer le changement de l'input contrôlé)
  handleChange = (e) => {
    this.setState({
      item: e.target.value //intéréssé par la valeur qui sera tapée dans l'input
    })
  }

  //méthode 2: 
  handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { //détermine les props à passer sur les enfants
      id: this.state.id,
      title: this.state.item
    }
    //utilisation du spread operator
    const updatedItems = [...this.state.items, newItem]; //copie qui prend en compte toutes les valeurs passées dans le tableau + newItem

    this.setState({
      items: updatedItems,
      item: '',
      id: uuidv4(),
      editItem: false
    })
  }
  //méthode 3: clear list
  clearList = () => {
    this.setState({
      items: []
    })
  }

  // méthode 4: supprimer avec l'icon seulement l'item en question
  handleDelete = (id) => {
    //on affichera tous les items sauf celui dont l'id correspond (il sera comme supprimé!)
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };

  //méthode 5: gestion de la modification de l'input (on le filtre et on le fait apparaitre en haut)
  handleEdit = (id) => {
    //on retire l'item en question (on retourne l'array)
    const filteredItems = this.state.items.filter(item => item.id !== id);

    //on affiche l'item en haut (on en retourne qu'un donc on utilise find())
    const selectedItem=this.state.items.find(item=>item.id === id);
   

    this.setState({
      items:filteredItems, //on supprime l'item en question de la liste
      item:selectedItem.title, //on affiche son titre de nouveau dans l'input text en haut
      editItem:true,
      id:id
    })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-4">
              <h3 className="text-capitalize text-center">todo input</h3>

              {/*on passe les props pour chaque composant enfant */}
              <TodoInput
                item={this.state.item}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} 
                editItem={this.state.editItem}
                />
              <TodoList
                items={this.state.items}
                clearList={this.clearList}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
