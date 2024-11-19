import {TextProps, Text} from "react-native";

export function LightText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Assistant_300Light' }]} />;
}

export function RegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Assistant_400Regular' }]} />;
}

export function MediumText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Assistant_500Medium' }]} />;
}

export function SemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Assistant_600SemiBold' }]} />;
}

export function BoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Assistant_700Bold' }]} />;
}
