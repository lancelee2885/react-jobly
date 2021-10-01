import React from 'react';

/** Error: Component for displaying error messages.
 * 
 * @category React Components
 * @component 
 */
function Error ({errors}) {
  return (
  
    <div  className= {errors.length !== 0 ? "alert alert-dismissible alert-danger" : "" }>
      {errors ? errors.map(e => (<p>{e}</p>)) : null}
    </div>
  )
}

export default Error

