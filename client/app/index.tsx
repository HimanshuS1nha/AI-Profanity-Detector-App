import { Text } from "react-native";
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
    <SafeView style={tw`justify-center items-center`}>
      <Text style={tw`text-white`}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </SafeView>
  );
}
