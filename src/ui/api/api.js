import axios from "axios";
import { apiBaseUrl } from "../utils/url"
import { path } from "./path";

export const get = async (args) => {
    const apiPath = path[args.type][args.path]
    if (apiPath) {
        const response = await axios.get(`${apiBaseUrl}/${apiPath}`)
        if (response) {
            return response.data
        } else {
            console.error("CustumError -api.js -get()--> response not found or empty response");
        }
    }
    else {
        console.error("CustumError -api.js -get()--> path given in apiHook was not found");
    }
}

export const post = async (args) => {
    // console.log('args: ', args);
    const apiPath = path[args.type][args.path]
    if (apiPath ) {
        const response = await axios.post(`${apiBaseUrl}/${apiPath}`, args.data?.body)
        if (response) {
            return response.data
        } else {
            console.error("CustumError -api.js -post()--> response not found or empty response");
        }
    }
    else {
        console.error("CustumError -api.js -post()--> path given in apiHook was not found");
    }
}

export const put = async (args) => {
    const apiPath = path[args.type][args.path]
    // console.log('args: ', args.data.body);
    if (apiPath) {
        const response = await axios.put(`${apiBaseUrl}/${apiPath}/${args.data?.params?.id}`, args.data?.body)
        if (response) {
            return response.data
        } else {
            console.error("CustumError -api.js -put()--> response not found or empty response");
        }
    }
    else {
        console.error("CustumError -api.js -put()--> path given in apiHook was not found");
    }
}

export const deleted = async (args) => {
    const apiPath = path[args.type][args.path]
    // console.log('args: ', args.data.body);
    if (apiPath) {
        const response = await axios.delete(`${apiBaseUrl}/${apiPath}/${args.data?.params?.id}`, args.data?.body)
        if (response) {
            return response.data
        } else {
            console.error("CustumError -api.js -put()--> response not found or empty response");
        }
    }
    else {
        console.error("CustumError -api.js -put()--> path given in apiHook was not found");
    }
}
