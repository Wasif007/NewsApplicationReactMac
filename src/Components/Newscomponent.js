import React, { Component } from 'react'

export class Newscomponent extends Component {
    
  render() {
    const {name,desc,imageUrl,urlTo}=this.props;
    return (
      <div className='container my-3'>
        <div className="card" >
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{name}...</h5>
    <p className="card-text">{desc}...</p>
    <a href={urlTo} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newscomponent
