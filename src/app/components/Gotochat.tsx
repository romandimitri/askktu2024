"use client";
import { HoverBorderGradient } from "../components/hover-border-gradient";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

const GotoChat = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useMutation({
    mutationFn: async () => {
      const file_key = nanoid();
      const file_name = "generated_file.txt";
      const response = await axios.post("/api/create-chat", { file_key, file_name });
      return response.data;
    },
  });

  const handleClick = async () => {
    setLoading(true);
    try {
      mutate(undefined, {
        onSuccess: ({ chat_id }) => {
          toast.success("Chat created!");
          router.push(`/chat/${chat_id}`);
        },
        onError: (err) => {
          toast.error("Error creating chat");
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
      <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        onClick={handleClick}
      >
 <span>Go To Chat</span>      </HoverBorderGradient>   
  );
};

export default GotoChat;