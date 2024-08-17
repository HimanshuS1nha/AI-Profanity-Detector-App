import { View, Text } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";

import SafeView from "@/components/SafeView";

const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { by: "ai" | "user"; content: string }[]
  >([]);
  return (
    <SafeView>
      <View style={tw`flex-row justify-center items-center gap-x-3 pt-2`}>
        <Text style={tw`text-3xl`}>🤬</Text>
        <Text style={tw`text-2xl text-white font-semibold`}>
          Profanity Detector
        </Text>
      </View>
    </SafeView>
  );
};

export default Home;
