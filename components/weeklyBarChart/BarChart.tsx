import React, { useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Svg, { Rect, Line, Text } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    SharedValue,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CustomBarChart = ({ data }: { data: { value: number; label: string }[] }) => {
    const { width: screenWidth } = useWindowDimensions();

    const height = 200; // Chart height
    const barWidth = 10;
    const spacing = 35;
    const minHeight = 5;

    // Find the highest value in the data array
    const maxValue = Math.max(...data.map((item) => item.value));

    // Create shared values for each bar's height
    const animatedHeights = data.map(() => useSharedValue(0));

    useEffect(() => {
        // Animate bars to their respective normalized heights
        animatedHeights.forEach((animatedHeight: SharedValue<number>, index: number) => {
            const normalizedHeight = data[index].value
                ? (data[index].value / maxValue) * height
                : minHeight;
            animatedHeight.value = withTiming(normalizedHeight, { duration: 1000 });
        });
    }, [data]);

    return (
        <View style={{ flex: 1, paddingTop: 150 }}>
            <Svg width={screenWidth - 40} height={height + 40}>
                {/* Baseline */}
                {/*<Line*/}
                {/*    x1="0"*/}
                {/*    y1={height}*/}
                {/*    x2={screenWidth - 40}*/}
                {/*    y2={height}*/}
                {/*    stroke="gray"*/}
                {/*    strokeWidth="1"*/}
                {/*/>*/}

                {/* Bars */}
                {data.map((item, index) => {
                    const animatedProps = useAnimatedProps(() => ({
                        height: animatedHeights[index].value,
                        y: height - animatedHeights[index].value, // Adjust y for the height
                    }));

                    return (
                        <AnimatedRect
                            key={index}
                            x={index * (barWidth + spacing) + spacing}
                            width={barWidth}
                            rx="6" // Rounded corners
                            fill="#018673"
                            animatedProps={animatedProps}
                        />
                    );
                })}

                {/* Labels */}
                {data.map((item, index) => (
                    <Text
                        key={`label-${index}`}
                        x={index * (barWidth + spacing) + spacing + barWidth / 2}
                        y={height + 20}
                        fontSize="10"
                        fill="gray"
                        textAnchor="middle"
                    >
                        {item.label}
                    </Text>
                ))}
            </Svg>
        </View>
    );
};

export default CustomBarChart;
