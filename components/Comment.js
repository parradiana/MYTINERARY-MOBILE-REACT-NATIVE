import React from 'react'
import { useEffect, useState } from "react"
import { Image, Text, TextInput, View, StyleSheet, Pressable, Modal,TouchableHighlight } from "react-native"
import { connect } from "react-redux"
import Ioicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome';
const Comment = (props) => {
    const { comment, updatedComment, deleteComment, usuarioLogueado } = props
    const [commentContent, setCommentContent] = useState(comment.comment)
    const [modalVisible, setModalVisible] = useState(false)
    const [enabledUser, setEnabledUser] = useState(false)
    const [updateComment, setUpdateComment] = useState(false)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (usuarioLogueado && usuarioLogueado.email === comment.userId.email) {
            setEnabledUser(true)
        }
    }, [])
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <Image source={{ uri: comment.userId.image }} style={styles.userImage} />
                <View>
                    <Text style={styles.userName}>{comment.userId.firstname} {comment.userId.lastname}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                {!updateComment
                    ? <View style={styles.contenedorComment}>
                        <Text style={styles.comment}>{comment.comment}</Text>
                    </View>
                    : <View style={styles.editComment}>
                        <TextInput value={commentContent} onChangeText={e => setCommentContent(e)} />
                        <Pressable onPress={() => { updatedComment(commentContent, comment._id); setVisible(false); setUpdateComment(!updateComment) }}>
                            <Ioicons name="send" style={{ color: '#ff9566', fontSize: 25 }} />
                        </Pressable>
                    </View>
                }
                {
                    enabledUser &&
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Pressable onPress={() => { setUpdateComment(!updateComment) }}>
                            {!updateComment ? <Icon name='pencil-square-o' style={{ color: '#ff9566', fontSize: 25, marginLeft: 5 }} /> : <Icon name='times' style={{ color: '#ff9566', fontSize: 25, marginLeft: 5 }} />}
                        </Pressable>
                        <Pressable onPress={() => { setModalVisible(true)}}>
                            <Icon name='trash-o' style={{ color: '#ff9566', fontSize: 25, marginLeft: 5 }} />
                        </Pressable>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Do you want to delete this message?</Text>
                                    <View style={styles.modalButtons}>
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: '#ff9566' }}
                                            onPress={() => {
                                                deleteComment(comment._id)
                                            }}>
                                            <Text style={styles.textStyle}>Yes</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: '#ff9566' }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={styles.textStyle}>No</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    userName: {
        fontSize: 20,
        marginLeft: 7
    },
    contenedorComment: {
        backgroundColor: '#e9e9eb',
        borderRadius: 20,
        marginLeft: 48,
    },
    comment: {
        color: '#000',
        textAlign: 'left',
        paddingTop: 3,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 5,
        fontSize: 20,

    },
    editComment: {
        backgroundColor: '#e9e9eb',
        textAlign: 'left',
        paddingTop: 3,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 5,
        flexWrap: 'wrap',
        fontSize: 30,
        borderWidth: 2,
        borderColor: "#ff9566",
        borderRadius: 20,
        marginLeft: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%'
    },
    centeredView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    openButton:{
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginLeft: 15
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText:{
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    modalButtons:{
        flexDirection: 'row',
        marginRight: 10
    },
    textStyle:{
        color: 'white'
    }
})
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
export default connect(mapStateToProps)(Comment)