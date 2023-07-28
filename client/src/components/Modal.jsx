import React from 'react'

const Modal = ({children, setIsOpen} ) => {
    return (
        <div className="modal">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-8">
                <img 
                    src="/close.svg" width={17} height={17} alt="close"
                />
            </button>
    
            <div className="modal_wrapper">
                {children}
            </div>
    
        </div>
      )
}

export default Modal
