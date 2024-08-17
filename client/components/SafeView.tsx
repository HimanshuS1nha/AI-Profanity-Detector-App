import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";
import React, { memo } from "react";

const SafeView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <SafeAreaView
      style={[
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "#000",
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default memo(SafeView);
