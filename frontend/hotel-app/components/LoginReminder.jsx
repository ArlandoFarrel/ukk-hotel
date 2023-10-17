import React from 'react';

const LoginReminder = ({ onClose }) => {
  return (
    <div className="login-reminder">
      <p>Anda perlu login terlebih dahulu untuk memesan kamar.</p>
      <button onClick={onClose}>Tutup</button>
    </div>
  );
};

export default LoginReminder;
