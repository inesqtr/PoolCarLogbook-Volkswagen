import React, { Component } from 'react';
import { ReactAgenda, Modal } from 'react-agenda';
import { BrowserRouter } from 'react-router-dom';

import Booking from './Booking/Booking';
import './Calendar.css';


const now = new Date();

require('moment/locale/en-gb.js');

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)" ,
  "color-4":"rgba(70, 159, 213, 1)",
  "color-5":"rgba(170, 59, 123, 1)"
}

// For testing proposes

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      selected:[],
      cellHeight: 20,
      showModal:false,
      locale:"en",
      rowsPerHour:2,
      numberOfDays: 7,
      startDate: new Date()
    }
  }

  
  componentDidMount() {      
    console.log('mounting')       
    this.setState({items:this.props.tripsForCalendar});
  }

  componentDidUpdate(next , last) {
    if(next.items){ 
      this.setState({items:next.items});
    }
  }


  handleItemEdit = (item, openModal) => {
    console.log('handleItemEdit', item)
    if(item && openModal === true){
      this.setState({selected:[item] })
      return this._openModal();
    }
  }

  handleCellSelection = (item, openModal) => {
    console.log('handleCellSelection',item)
    if(this.state.selected && this.state.selected[0] === item){
      return  this._openModal();
    }
      this.setState({selected:[item] })
  }

  handleRangeSelection = (selected) => {
    console.log('handleRangeSelection', selected);
    this.setState({selected:selected , showCtrl:true});
    this._openModal();
  }

  _openModal = () => {
    this.setState({showModal:true})
  }

  _closeModal = (e) => {
    console.log("closing!")
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }

  handleItemChange = (items , item) => {
    this.setState({items:items})
  }
  
  render() {
    console.log('this.props.tripsForCalendar in calendar render',this.props.tripsForCalendar)
    console.log('this.state.items in calendar render',this.state.items)
    return (

      <section className="content-expanded "
        style={{padding:'0 10vw'}}
      >
        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={7}
          endAtTime={20}
          cellHeight={this.state.cellHeight}
          locale="en"
          items={this.props.tripsForCalendar}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={true}
          view="calendar"
          autoScale={true}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
        />
        {

        this.state.showModal ? 
            <Modal clickOutside={this._closeModal} >
              <BrowserRouter>
                <Booking isNew={this.props.isNew} trips={this.props.trips} postTrip={this.props.postTrip}/>
              </BrowserRouter>
            </Modal> 
            : ''
        }
       </section>

    );
  }
}