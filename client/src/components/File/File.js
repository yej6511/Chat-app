import React from 'react';


const File = ({  }) => (
    <form className="form">
      <input
        className="input"
        type="file"
      />
      <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
  )
  
  export default File;