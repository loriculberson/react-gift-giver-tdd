import React, { Component } from 'react';
import './GiftList.css';

class GiftList extends Component {
  state = {
    gifts: [],
    newGift: { id: '', person: '', giftName: ''},
    errorFlag: true
  }

  doInputFieldsHaveContent = () => {
    // console.log('state:', this.state.newGift);
    const { person, giftName } = this.state.newGift;
    const hasPerson = person && person.length > 0;
    const hasGiftName = giftName && giftName.length > 0;
    this.setState({
      errorFlag: !hasPerson || !hasGiftName
    });
  }

  captureName = (event) =>{
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

  nextId = () => {
    return this.state.gifts.reduce(( acc, cur ) => {
      return Math.max( acc, cur.id )
    }, 0) + 1
  }

  submitGift = (event) => {
    let errorFlag = true
    let newGift = Object.assign({}, this.state.newGift, {id: this.nextId()})
    const gifts = [...this.state.gifts, newGift]

    newGift = {
      id: "",
      person: "",
      giftName: ""
    } 

    this.setState({ gifts, newGift, errorFlag})
  }

  removeGift = (id) => {
    const gifts = this.state.gifts.filter( gift => gift.id !== id );

    this.setState({ gifts });
  }
  
  render() {
    const allGifts = this.state.gifts.map( gift => {
      return (
        <li key={gift.id}>
          {gift.person} | {gift.giftName}

          <button 
            className="delete" 
            id={"delete-item-" + gift.id}
            onClick={() => this.removeGift(gift.id)}>
            Delete
          </button>
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

export default GiftList;