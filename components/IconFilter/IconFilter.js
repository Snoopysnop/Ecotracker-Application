import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';

import { icons } from './IconList';

export default function IconFilter({ data, setData }) {
    const [groupsSelected, setGroupsSelected] = React.useState([]);

    const handleClick = (icon) => {
        const newGroupsSelected = groupsSelected;
        if (icon.selected) {
            const index = newGroupsSelected.indexOf(icon.category);
            newGroupsSelected.splice(index, 1);
        }
        else {
            newGroupsSelected.push(icon.category)
        }
        icon.selected = !icon.selected;
        setGroupsSelected(newGroupsSelected);
        console.log(data[0].groupsToIdentify)
        setData(newGroupsSelected.length ?
            data.filter(campaign => campaign.groupsToIdentify.some(group => newGroupsSelected.includes(group))) :
            data
        );
    }

    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {icons.map((icon, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            backgroundColor: icon.selected ? '#8BC0C0' : '#00000000',
                            ...styles.closeButtonParent
                        }}
                        onPress={() => handleClick(icon)}
                    >
                        <Image
                            style={styles.icon}
                            source={icon.image}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 35,
        width: 35,
        margin: 10,
    },
    closeButtonParent: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginRight: 5,
    },
})