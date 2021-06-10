import React, { useEffect, useState } from 'react'
import {Text, View, StyleSheet, Alert, Image, Modal, Pressable, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import { SliderBox } from "react-native-image-slider-box";
import Ioicons from 'react-native-vector-icons/Ionicons'
import { Ionicons } from '@expo/vector-icons';
import Comments from '../components/Comments'
import { showMessage, hideMessage } from "react-native-flash-message";
const Itinerary = (props) => {
    const { itinerary, usuarioLogueado } = props
    const { itineraryImage, authorImage, authorName, tittle, description, hashtags, price, duration, _id } = itinerary
    const [itinerariesLikes, setItinerariesLikes] = useState(itinerary.userLiked)
    const [color, setColor] = useState(false)
    const [loadingHeart, setLoadingHeart] = useState(true)
    const [comments, setComments] = useState(itinerary.comments)
    const [activities, setActivities] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [inputcomment, setInputComment] = useState({ comment: '', token: '' })
    const actividades = async () => {
        const response = await props.cargarActividades(_id)
        setActivities(response.activities)
    }
    useEffect(() => {
        actividades()
    }, [])
    var imageActivity = activities.map(activity => activity.imageActivity)
    var carouselActivity = [itineraryImage, ...imageActivity]
    useEffect(() => {
        usuarioLogueado ? (itinerariesLikes.includes(usuarioLogueado.email) && setColor(true)) : setColor(false)
    }, [itinerariesLikes])

    const likes = async () => {
        if (!usuarioLogueado) {
            showMessage({
                message: 'You must be logged in to like a post',
                type: "danger",
            });
        } else {
            setLoadingHeart(false)
            const response = await props.like(usuarioLogueado.token, itinerary._id)
            setItinerariesLikes(response.userLiked)
            setColor(response.heart)
            setLoadingHeart(true)
        }
    }
    let input = usuarioLogueado ? { inputcomment: 'Leave a comment...', editable: true } : { inputcomment: 'You must be logged in to post a comment', editable: false }
    const leerInput = (e) => {
        setInputComment({
            ...inputcomment,
            comment: e,
            token: usuarioLogueado.token
        })
    }
    const sendComment = async() => {
        const spaceComment = inputcomment.comment.charAt(0)
        if (usuarioLogueado) {
            if (spaceComment === " " || inputcomment.comment === "") {
                showMessage({
                    message: "You can't post an empty comment",
                    type: "danger",
                });
            } else {
                const response = await props.cargarComentario(inputcomment, _id)
                setComments(response.comments)
                setInputComment({ comment: '', token: '' })
            }
        }   
    }
    return (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <View style={styles.contenedorItineraries}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Image source={{ uri: authorImage }} style={styles.authorImage} />
                    <Text style={{ color: '#ff9566', fontWeight: 'bold', fontSize: 17, marginLeft: 5 }}>{authorName}</Text>
                </View>
                <SliderBox images={carouselActivity}
                    sliderBoxHeight={400}
                    parentWidth={344}
                    imageLoadingColor="#ff9566" />
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Pressable onPress={(loadingHeart ? likes : null)}>
                                    {color ? <Icon name='heart' style={styles.iconoLikes} /> : <Icon name='heart-o' style={styles.iconoLikes} />}
                                </Pressable>
                                <Text style={{ color: '#ff9566', fontSize: 17, marginLeft: 6 }}>{itinerariesLikes.length}</Text>
                            </View>
                            <Pressable style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                                <Icon name="comments-o" style={{ fontSize: 30, color: '#ff9566' }} />
                                <Text style={{ color: '#ff9566', fontSize: 17, marginLeft: 6 }}>{comments.length}</Text>
                            </Pressable>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.modalView}>
                                    <Pressable onPress={() => setModalVisible(false)}>
                                        <Ioicons name="arrow-back" style={styles.arrow} />
                                    </Pressable>
                                    <Comments itinerary={itinerary._id} comments={comments} setComments={setComments} />
                                    <View style={styles.contenedorInputSend}>
                                        <TextInput placeholder={input.inputcomment} value={inputcomment.comment} onChangeText={leerInput} editable={input.editable} style={{width: "80%"}}/>
                                        <Ionicons name="send" size={25} color="#ff9566" onPress={() => sendComment()}/>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginTop: 10}}>
                        <View style={{ backgroundColor: '#ff9566', borderRadius: 30, paddingBottom: 4, paddingTop: 4, paddingLeft: 15, paddingRight: 10 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>{tittle}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                            <Text style={{ color: '#ff9566', fontSize: 17, fontWeight: 'bold', marginLeft: 6 }}>Price:</Text>
                            {[...Array(price)].map((cash, index) => {
                                return <Icon name="money" style={{ fontSize: 25, color: "rgb(8, 184, 8)", marginLeft: 6 }} key={index} />
                            })}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Ioicons name="time-outline" style={{ fontSize: 25, color: "#ff9566", marginLeft: 6 }} />
                            <Text style={{ color: '#ff9566', fontSize: 17, fontWeight: 'bold' }}>{itinerary.duration} hours</Text>
                        </View>
                        <Text style={{ color: 'black', fontSize: 17, marginLeft: 5, marginTop: 5 }}>{description}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{itinerary.hashtags.map((hashtag, index) => <Text key={index} style={{ color: '#ff9566', fontSize: 17, marginRight: 20 }}>{hashtag}</Text>)}</View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    contenedorItineraries: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '95%',
        justifyContent: 'center',
        padding: 15,
    },
    itineraryImage: {
        width: '100%',
        height: 300
    },
    authorImage: {
        minWidth: 55,
        height: 57,
        borderRadius: 50
    },
    iconoLikes: {
        fontSize: 25,
        color: 'red'
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
    },
    arrow: {
        color: '#ff9566',
        fontSize: 30,
        marginTop: 20
    },
    contenedorInputSend: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: '#ff9566',
        padding: 10,
        width: '90%',
        marginLeft: 20,
        // marginBottom: 30
        // backgroundColor: 'black'
    }
})
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    like: itinerariesActions.like,
    cargarActividades: itinerariesActions.cargarActividades,
    cargarComentario: itinerariesActions.cargarComentario,
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)