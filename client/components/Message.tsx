import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

import type { MessageType } from "@/types";

const Message = ({ message }: { message: MessageType }) => {
  return (
    <View
      style={tw`${
        message.by === "user" ? "items-end" : "items-start"
      } px-4 mb-4`}
    >
      <View
        style={tw`${
          message.by === "user"
            ? "bg-blue-600 rounded-tr-none"
            : "bg-gray-700 rounded-bl-none"
        } px-4 py-3 min-w-[55%] max-w-[90%] rounded-xl`}
      >
        <Text style={tw`text-white text-base`}>{message.content}</Text>
      </View>
    </View>
  );
};

export default Message;
