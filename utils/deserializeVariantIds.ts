import Personalize from '@contentstack/personalize-edge-sdk'

export function deserializeVariantIds () : string {
    try {
        return Personalize.getVariantAliases().join(',')
    } catch (err) {
        console.error('Error while deserializing variant ids : ', err)
        return ''
    }
}