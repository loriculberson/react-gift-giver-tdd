import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  state = {
    gifts: [],
    newGift: { person: '', giftName: ''},
    errorFlag: true
  }

  doInputFieldsHaveContent = () => {
    console.log('state:', this.state.newGift);
    const { person, giftName } = this.state.newGift;
    const hasPerson = person && person.length > 0;
    const hasGiftName = giftName && giftName.length > 0;
    this.setState({
      errorFlag: !hasPerson || !hasGiftName
    });
  }

  captureName = (event) =>{
    console.log(`person`, event.target.value)
    console.log(`person length capName`, event.target.value.length)
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        person: event.target.value
      }
    }, this.doInputFieldsHaveContent)
  }

  captureGift = (event) =>{
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        giftName: event.target.value
      }
    }, this.doInputFieldsHaveContent)
  }

  submitGift = (event) => {
    let errorFlag = true
    let newGift = Object.assign({}, this.state.newGift)
    const gifts = [...this.state.gifts, newGift]

    newGift = {
      person: "",
      giftName: ""
    } 

    this.setState({ gifts, newGift, errorFlag})
  }
  
  render() {
    const allGifts = this.state.gifts.map( (gift, index) => {
      return (
        <li key={index}>
          {gift.person} | {gift.giftName}

          <button class="delete" id={`delete-${gift.id}`}>Delete</button>
        </li>
      )
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
        <button 
          data-submit 
          onClick={this.submitGift}
          disabled={this.state.errorFlag}>
          Add Gift
        </button>

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