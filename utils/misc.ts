/* eslint-disable @typescript-eslint/no-unused-vars */
import * as _ from 'lodash'
import { isEditButtonsEnabled } from '@/config'

export const prefixReferenceIncludes = (mbId: string, ...references: string[]) => {
    const result = references.map(e => mbId + '.' + e)
    return result
}

export const inIframe = () => {
    try {
        return window.self !== window.top
    } catch (e) {
        return true
    }
}

export const isDataInLiveEdit = () => {
    return inIframe() && isEditButtonsEnabled
}

export const addToDateNow = (seconds: number) => {
    const newDate = new Date()
    newDate.setTime(new Date().getTime() + (seconds * 1000))
    return newDate
}

export const capitalizeFirstLetter = (text:string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
