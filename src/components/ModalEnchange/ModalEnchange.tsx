import React from 'react'
import Modal from '../Modal/Modal';
interface ModalEnchangeProps{
  enchangeFair: boolean
    isOpen: boolean,
    onClose: ()=> void;
    onClickCancel: ()=> void;
    onClickProceed: ()=> void;


}
const ModalEnchange = ({enchangeFair,isOpen,onClose,onClickCancel,onClickProceed}:ModalEnchangeProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">{enchangeFair ? "A troca é justa!": "A troca não é justa!"}</h1>
      <p>
        
        A troca que você deseja realizar é considerada {enchangeFair ? 'justa': 'injusta' } , deseja
        prosseguir ? .
      </p>
      <div className="flex flex-1 justify-between">
        <button
          onClick={onClickCancel}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={onClickProceed}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Continuar
        </button>
      </div>
    </div>
  </Modal>
  )
}

export default ModalEnchange