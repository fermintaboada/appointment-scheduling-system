/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios, { Axios } from "axios";

export const UsersContext = createContext({
    isLogged: null,
    userAppointments: [],
    registerUser: () => { },
    loginUser: () => { },
    logOutUser: () => { },
    getUserAppointments: async() => {},
    createUserApp: async() => {},
    cancelUserApp: async() => {}
})

export const UsersProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const [userAppointments, setUserAppointments] = useState([])

    const registerUser = async (userData) => {
        await axios.post("http://localhost:3000/users/register", userData)
    }

    const loginUser = async (userData) => {
        const respuesta = await axios.post("http://localhost:3000/users/login", userData)
        if (respuesta.status === 200) {
            localStorage.setItem("user", JSON.stringify(respuesta.data.user)) 
            setIsLogged(respuesta.data.user)
        } 
        return respuesta   
    }

    const logOutUser = () => {
        localStorage.removeItem("user")
        setIsLogged(false)
    }

    const getUserAppointments = async() => {
        const respuesta = await axios.get(`http://localhost:3000/users/${isLogged.id}`)
        setUserAppointments(respuesta.data.appointments)
    }

    const createUserApp = async(dateTime) => {
        const appInfo = {
            ...dateTime,
            userId: isLogged.id
        }
        return await axios.post('http://localhost:3000/appointments/schedule', appInfo)
    }

    const cancelUserApp = async(id) => {
        await axios.put(`http://localhost:3000/appointments/cancel/${id}`)
        const nuevoArrayApp = userAppointments.map( app => {
            if(app.id === id) {
                return {
                    ...app,
                    status: "cancelled"
                }
            } else return app
        })
        setUserAppointments(nuevoArrayApp)
    }

    const value = {
        isLogged,
        userAppointments,
        registerUser,
        loginUser,
        logOutUser,
        getUserAppointments,
        createUserApp,
        cancelUserApp
    }
    return (
        <UsersContext.Provider value={value}>
        {children}
        </UsersContext.Provider>
    )
}
