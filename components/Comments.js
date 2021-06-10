import React from 'react'
import { connect } from "react-redux"
import Comment from "./Comment"
import { Alert, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import itinerariesActions from '../redux/actions/itinerariesActions';
const Comments = (props) => {
    const { setComments, comments, usuarioLogueado } = props
    const updatedComment = async (comment, idComment) => {
        const response = await props.editarComentario(props.itinerary, comment, idComment)
        setComments(response)
    }
    const deleteComment = async (idComment) => {
        const response = await props.borrarComentario(props.itinerary, idComment)
        setComments(response.comments)
    }

    return (
        <View style={{ width: '100%', alignItems: 'center', height: '80%'}}>
            {comments.length === 0
                ? <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <Text style={{ color: '#ff9566', fontSize: 25}}>No comments yet</Text>
                    <Text style={{ color: '#ff9566', fontSize: 25 }}>Be the first to post one!</Text>
                </View>
                :
                <ScrollView>
                    {comments.map(comment => {
                        return (
                            <Comment key={comment._id} comment={comment} updatedComment={updatedComment} deleteComment={deleteComment} />
                        )
                    })}
                </ScrollView>
            }
        </View>
    )
}
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    editarComentario: itinerariesActions.editarComentario,
    borrarComentario: itinerariesActions.borrarComentario
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)