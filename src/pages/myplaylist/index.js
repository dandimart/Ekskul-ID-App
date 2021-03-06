import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Gap, List } from '../../components'

const Myplaylist = ({navigation}) => {
    const [loader,setLoader] = useState(true)
    const [course,setCourse] = useState([])

    useEffect(()=>{

        const _myCourse = async ()=>{
            const api_token = await AsyncStorage.getItem('api_token')
            const id_user = await AsyncStorage.getItem('id_user')
            Axios.get(`https://service.ekskul.co.id/api/v1/orders/${id_user}`,{
                headers: {"Authorization" : `Bearer ${api_token}`}
            })
            .then(res=>{
                setCourse(res.data.data)
                console.log("Dtaanyah",res.data.data)
                setLoader(false)
                console.log(id_user)
            })
        }

        _myCourse();

    },[])

    const RenderMyCourse = useCallback( ({item}) => {
        return(
            <>
                <Gap height={20} />
                <List
                    icon={`https://service.ekskul.co.id/${item.image}`}
                    onPress={()=>{navigation.navigate('ActionPlay')}} 
                    type="play-search" 
                    title={`${item.playlist_name}`}
                    count={`${item.category_name}`} 
                />
            </>
        )
    },[course])

    return (
        <View style={styles.pages}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        !loader ?
                        <>
                            <FlatList
                                data={course}
                                keyExtractor={(item,index)=> index.toString() }
                                renderItem={({item})=> <RenderMyCourse item={item} /> }
                            />
                        </>
                        : 
                        <>
                        <Gap height={20} />
                        <List type="placeholder" />
                        <Gap height={25} />
                        <List type="placeholder" />
                        <Gap height={25} />
                        <List type="placeholder" />
                        <Gap height={25} />
                        <List type="placeholder" />
                        </>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default Myplaylist

const styles = StyleSheet.create({
    pages:{
        flex: 1,
        backgroundColor: '#262F56',
    },
    container:{
        flex: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'white',
        padding: 15
    }
})
