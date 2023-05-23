import React from 'react';
import Modal from 'react-modal';

const DeleteRoomModal = ({ isOpen, closeModal, handleDelete }) => {
  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete Room Modal"
      ariaHideApp={false}
    >
      <h2>Delete Room</h2>
      <p>Are you sure you want to delete this room?</p>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={confirmDelete}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteRoomModal;
