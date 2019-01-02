import React, { Component } from 'react';

class App extends Component {
  state = {
    gifts: [],
    newGift: { person: '', giftName: ''}
  }

  //update the newGift Object person
  captureName = (event) =>{
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        person: event.target.value
      }
    })
  }

  captureGift = (event) =>{
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        giftName: event.target.value
      }
    })
  }

  submitGift = (event) => {
    //create a newGift object,
    //add the newGift object into gifts
    //empty out the input fields
    //render gifts on the page
    let newGift = Object.assign({}, this.state.newGift)
    const gifts = [...this.state.gifts, newGift]

    newGift = {
      person: "",
      giftName: ""
    } 

    this.setState({ gifts, newGift})
  }
  
  
  render() {
    const allGifts = this.state.gifts.map( (gift, index) => {
      return <li key={index}>{gift.person} | {gift.giftName}</li>
    })

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
          value={this.state.newGift.giftName}
          onChange={this.captureGift}
        />
        <button data-submit onClick={this.submitGift}>Add Gift</button>

        <section>
          <ul data-gift-list>
            {allGifts}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;