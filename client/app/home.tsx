import { View, Text, TextInput, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";

import SafeView from "@/components/SafeView";
import type { MessageType } from "../types";
import Message from "@/components/Message";

const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    { by: "ai", content: "Hello" },
    { by: "user", content: "Hi" },
  ]);

  const handleChangeInput = useCallback((value: string) => setInput(value), []);

//   const handleSend = useCallback(() => {
//     setMessages((prev) => {
//       return [{ by: "user", content: input }, ...prev];
//     });
//     setInput("");
//   }, [messages, input]);
  return (
    <SafeView>
      <View style={tw`flex-row justify-center items-center gap-x-3 pt-2 pb-4`}>
        <Text style={tw`text-3xl`}>🤬</Text>
        <Text style={tw`text-2xl text-white font-semibold`}>
          Profanity Detector
        </Text>
      </View>

      <View style={tw`h-[85%]`}>
        <FlashList
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => {
            return <Message message={item} />;
          }}
          estimatedItemSize={50}
        />
      </View>

      <View style={tw`h-[7%] px-3.5 flex-row gap-x-3 items-center`}>
        <TextInput
          placeholder="Type here..."
          style={tw`border border-white px-4 py-2 rounded-full w-[87%] text-white`}
          placeholderTextColor={"#d1d5db"}
          value={input}
          onChangeText={handleChangeInput}
        />
        <Pressable style={tw`p-2 rounded-full bg-blue-600`}>
          <Ionicons name="send-sharp" size={26} color="white" />
        </Pressable>
      </View>
    </SafeView>
  );
};

export default Home;
