import mongoose from "mongoose"

const conn = async () => {

    try {
        
        const dbConn = await mongoose.connect(`mongodb+srv://neniade777:vXKzvJqGkh40lbOb@cluster0.iepi6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

        console.log('Conectou ao banco')

    } catch (error) {
        console.log('Erro' + error)
    }

}

export default conn