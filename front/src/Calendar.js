import React, { Component } from 'react';
import { ReactAgenda, Modal } from 'react-agenda';
import { BrowserRouter } from 'react-router-dom';

import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip'
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
      elementToEdit: null,
      cellHeight: 20,
      showModal:false,
      locale:"en",
      rowsPerHour:2,
      numberOfDays: 7,
      startDate: new Date()
    }
  }

  
  componentDidMount() {      
    this.setState({items:this.props.tripsForCalendar});
  }

  componentDidUpdate(next , last) {
    if(next.items){ 
      this.setState({items:next.items});
    }
  }


  handleItemEdit = (item, openModal) => {
    if(item && openModal === true){
      this.setState({elementToEdit:[item] })
      return this._openModal();
    }
  }

  handleCellSelection = (item, openModal) => {
    if(this.state.selected && this.state.selected[0] === item){
      return  this._openModal();
    }
      this.setState({selected:[item] })
  }

  handleRangeSelection = (selected) => {
    this.setState({selected:selected , showCtrl:true});
    this._openModal();
  }

  _openModal = () => {
    this.setState({showModal:true})
  }

  _closeModal = (e) => {
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false, elementToEdit: null})
  }

  handleItemChange = (items , item) => {
    this.setState({items:items})
  }
  
  render() {
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
          onRangeSelection={this.handleRangeSelection}
          onChangeEvent={this.handleItemChange}
          onItemEdit={this.handleItemEdit}
          onCellSelect={this.handleCellSelection}
        />
        {
        
        this.state.showModal ? 
            <Modal clickOutside={this._closeModal} >

              <BrowserRouter>
                {
                  this.state.elementToEdit ? 
                  <EditTrip               
                    //trip={this.props.triplocation}
                    isNew={this.props.isNew}
                    selectedTrip={this.props.selectedTrip}
                    editTrip={this.editTrip}/>
                  : <Booking isNew={this.props.isNew} postTrip={this.props.postTrip}/>
                }
              </BrowserRouter>
            </Modal> 
            : ''
        }
       </section>

    );
  }
}