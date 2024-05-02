import React, { useState } from 'react';

const CreateChatForm = () => {
  const [initialMessage, setInitialMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initialMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to the new chat
        window.location.href = `/chat/${data.chat_id}`;
      } else {
        console.error('Error creating chat:', data.error);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={initialMessage}
        onChange={(e) => setInitialMessage(e.target.value)}
        placeholder="Enter your initial message"
      />
      <button type="submit">Create Chat</button>
    </form>
  );
};

export default CreateChatForm;