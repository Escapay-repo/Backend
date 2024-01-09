import { Schema, model } from "mongoose"

const MaquininhaSchema = new Schema({
    key: String,
    tableName: String,
    debito: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    credito: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    duas: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    tres: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    quatro: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    cinco: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    seis: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    sete: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    oito: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    nove: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    dez: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    onze: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    doze: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    treze: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    quatorze: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    quinze: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    dezesseis: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    dezessete: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    dezoito: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    dezenove: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    vinte: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
    vinteUm: {
        masterCard: Number,
        visa: Number,
        outros: Number,
    },
})

export default model('Maquininha', MaquininhaSchema)