import React, { useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Svg, { Rect, Line, Text } from 'react-native-svg';
import Animated, {useSharedValue, useAnimatedProps, withTiming, SharedValue} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CustomBarChart = ({ data }: any) => {
    const { width: screenWidth } = useWindowDimensions();

    const height = 200;
    const barWidth = 10;
    const spacing = 25;
    const minHeight = 5

    const animatedHeights = data.map(() => useSharedValue(0));

    useEffect(() => {
        // Animate bars to their respective heights
        animatedHeights.forEach((animatedHeight: SharedValue<number>, index: number) => {
            const targetHeight = data[index].value === 0 ? minHeight : data[index].value;
            animatedHeight.value = withTiming(targetHeight, { duration: 1000 });
        });
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Svg width={screenWidth - 40} height={height + 40}>
                {/* Transparent baseline */}
                <Line
                    x1="0"
                    y1={height}
                    x2="100%"
                    y2={height}
                    stroke="transparent"
                    strokeWidth="1"
                />

                {/* Bars */}
                {data.map((item: {value: number, label: string}, index: number) => {
                    const animatedProps = useAnimatedProps(() => ({
                        height: animatedHeights[index].value,
                        y: height - animatedHeights[index].value,
                    }));

                    return (
                        <AnimatedRect
                            key={index}
                            x={index * (barWidth + spacing) + spacing}
                            y={height}
                            width={barWidth}
                            rx="6" // Rounded corners
                            fill="#018673"
                            animatedProps={animatedProps}
                        />
                    );
                })}

                {/* Labels */}
                {data.map((item: {value: number, label: string}, index: number) => (
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
