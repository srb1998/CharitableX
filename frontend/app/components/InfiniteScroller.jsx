import React from 'react'

const Scroller = () => {
  const messages = new Array(5).fill("Thank you for donating ");

  return (  
    <div className="border-1 border-teal-100 bg-blue-200 w-full inline-flex flex-nowrap overflow-hidden mt-5">
      <div className="flex space-x-20 animate-marquee">
        {messages.map((message, index) => (
          <span key={index} className="whitespace-nowrap text-blue-800 text-lg font-medium">{message}</span>
        ))}
      </div>
    </div>
  );
}

export default Scroller