import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import SafeView from "@/components/SafeView";
import type { MessageType } from "../types";
import Message from "@/components/Message";

const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = useCallback((value: string) => setInput(value), []);

  const handleSend = useCallback(() => {
    if (input.trim().length === 0) {
      return;
    }
    Keyboard.dismiss();
    setIsLoading(true);
    setMessages((prev) => {
      return [...prev, { by: "user", content: input }];
    });
    handleDetect();
  }, [messages, input]);

  const { mutate: handleDetect } = useMutation({
    mutationKey: ["detect"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/detect`,
        { text: input }
      );
      return data as { score: string };
    },
    onSuccess: (data) => {
      const score = parseFloat(data.score);
      if (score >= 0.75) {
        setMessages((prev) => [
          ...prev,
          { by: "ai", content: "🚨😱 BIG PROFANITY DETECTED!! 🚨😱" },
        ]);
      } else if (score < 0.75 && score >= 0.25) {
        setMessages((prev) => [
          ...prev,
          { by: "ai", content: "🚨😱 PROFANITY DETECTED!! 🚨😱" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { by: "ai", content: "👍 INPUT IS CLEAN!! 👍" },
        ]);
      }
    },
    onSettled: () => {
      setIsLoading(false);
      setInput("");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", "Some error occured. Please try again later!");
      }
    },
  });
  return (
    <SafeView>
      <View style={tw`flex-row justify-center items-center gap-x-3 pt-2 pb-4`}>
        <Text style={tw`text-3xl`}>🤬</Text>
        <Text style={tw`text-2xl text-white font-semibold`}>
          Profanity Detector
        </Text>
      </View>

      <View style={tw`h-[82%]`}>
        <FlashList
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => {
            return <Message message={item} />;
          }}
          estimatedItemSize={50}
        />
      </View>

      <View
        style={tw`h-[60px] px-3.5 flex-row gap-x-3 items-center absolute bottom-2 w-full`}
      >
        <TextInput
          placeholder="Type here..."
          style={tw`border border-white px-4 py-2.5 rounded-full w-[87%] text-white`}
          placeholderTextColor={"#d1d5db"}
          value={input}
          onChangeText={handleChangeInput}
          editable={!isLoading}
        />
        <Pressable
          style={tw`p-2 rounded-full bg-blue-600`}
          onPress={handleSend}
          disabled={isLoading}
        >
          <Ionicons name="send-sharp" size={26} color="white" />
        </Pressable>
      </View>
    </SafeView>
  );
};

export default Home;
