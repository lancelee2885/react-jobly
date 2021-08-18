import React from 'react';

function Error ({errors}) {
  return (
    <div>
      {errors ? errors.map(e => (<p>{e}</p>)) : null}
    </div>
  )
}

export default Error