import React from 'react';

function Error ({errors}) {
  return (
  
    <div  className= {errors.length !== 0 ? "alert alert-dismissible alert-danger" : "" }>
      {errors ? errors.map(e => (<p>{e}</p>)) : null}
    </div>
  )
}

export default Error

