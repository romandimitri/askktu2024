// components/createNewChat.js
"use client";

import React from 'react';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { nanoid } from 'nanoid';

const NewChat = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useMutation({
    mutationFn: async () => {
      const file_key = nanoid();
      const file_name = 'generated_file.txt';
      const response = await axios.post('/api/create-chat', { file_key, file_name });
      return response.data;
    },
  });

  const handleClick = async () => {
    setLoading(true);
    try {
      mutate(undefined, {
        onSuccess: ({ chat_id }) => {
          toast.success('Chat created!');
          router.push(`/chat/${chat_id}`);
        },
        onError: (err) => {
          toast.error('Error creating chat');
          console.error(err);
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button   className="w-full border-white border"
    style={{
      background: 'linear-gradient(to right, #6357ED, #57B7ED)',
      // Add any other styles you need for the button
    }} onClick={handleClick}>
      <PlusCircle className="mr-2 w-4 h-4" /> New Chat
    </Button>
  );
};

export default NewChat; // Exported as default
