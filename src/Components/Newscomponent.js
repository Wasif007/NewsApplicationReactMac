import React from "react";

const  Newscomponent =(props) =>{
 
    const { name, desc, imageUrl, urlTo, aurthor, date, source } = props;
    return (
      <div className="container my-3">
        <div className="card">
          <button type="button" className="btn btn-danger">
            {source} <span className="badge badge-dark"></span>
          </button>

          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {aurthor} at {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={urlTo}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newscomponent;
