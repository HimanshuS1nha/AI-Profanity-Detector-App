import { View, Text, ActivityIndicator } from "react-native";
import tw from "twrnc";

import SafeView from "@/components/SafeView";
import { useEffect } from "react";
import { router, useRootNavigationState } from "expo-router";

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (rootNavigationState?.key) {
      timeout = setTimeout(() => router.replace("/home"), 450);
    }

    return () => clearTimeout(timeout);
  }, [rootNavigationState?.key]);
  return (
    <SafeView style={tw`justify-center items-center gap-y-9`}>
      <View style={tw`flex-row justify-center items-center gap-x-3 pt-2`}>
        <Text style={tw`text-3xl`}>🤬</Text>
        <Text style={tw`text-2xl text-white font-semibold`}>
          Profanity Detector
        </Text>
      </View>

      <ActivityIndicator size={50} color={"blue"} />
    </SafeView>
  );
}
