import React, { Component } from 'react';

class App extends Component {
  state = {
    gifts: [],
    newGift: { person: '', gift: ''}
  }

  //update the newGift Object person
  captureName = (event) =>{
    console.log(this.state.newGift.person)
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        person: event.target.value
      }
    })
  }

  captureGift = (event) =>{
    console.log(this.state.newGift.gift)
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        gift: event.target.value
      }
    })
  }


  render() {
    return (
      <div>
        <h2>Gift Giver</h2>
        <input type='text' 
          data-person
          placeholder="name of gift recipient" 
          value={this.state.newGift.person}
          onChange={this.captureName}
        />
        <input type='text' 
          data-gift
          placeholder="what's the gift?" 
          value={this.state.newGift.gift}
          onChange={this.captureGift}
        />
        <button data-submit>Add Gift</button>
      </div>
    );
  }
}

export default App;