import {StyleSheet} from "react-native";

export default StyleSheet.create({
    input: {
        height: 48,
        fontSize: 14,
        borderColor: '#efefef',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 30,
        paddingLeft: 22,
        paddingVertical: 14,
        // width:screenWidth,
        shadowColor: '#999999',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,

        elevation: 2,
    },
    nextBtnContainer:{
        width:'100%',
        alignItems:'center',
        marginVertical:16,
    }
})