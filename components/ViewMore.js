import ViewMoreText from 'react-native-view-more-text';
import { StyleSheet, Text } from 'react-native';

export default function ViewMore({ description }) {
    const renderViewMore = (onPress) => {
        return (
            <Text style={styles.seeButton} onPress={onPress}>View more</Text>
        )
    }

    const renderViewLess = (onPress) => {
        return (
            <Text style={styles.seeButton} onPress={onPress}>View less</Text>
        )
    }

    return (
        <ViewMoreText
            numberOfLines={5}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            textStyle={{ textAlign: 'justify' }}
        >
            <Text>
                {description}
            </Text>
        </ViewMoreText>
    )
}

const styles = StyleSheet.create({
    seeButton: {
        marginTop: 8,
        color: '#2E9A99',
        fontWeight: 600,
    },
})