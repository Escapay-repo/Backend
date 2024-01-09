import Maquininha from "../models/MaquininhaModel.js";

class MaquininhaController {

    async maquininhaCreate(req, res) {
        try {
            const dadosRecebidos = req.body;
            const novaMaquininha = await Maquininha.create(dadosRecebidos);
            return res.json(novaMaquininha);

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao criar tabela' })
        }
    }

    async maquininhaIndex(req, res) {
        try {
            const maquininhas = await Maquininha.find()
            return res.json(maquininhas)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao obter tabelas' })
        }
    }

    async maquininhaId(req, res) {
        const { _id } = req.params;
        try {
            const maquininha = await Maquininha.findOne({ _id: _id })
            if (!maquininha) {
                return res.status(404).json({ error: 'Tabela não encontrada' })
            }
            return res.json(maquininha)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao buscar tabela pelo ID' })
        }
    }
    async maquininhaUpdate(req, res) {
        const { key } = req.params;
        const dadosRecebidos = req.body;

        try {
            const maquininha = await Maquininha.findOneAndUpdate(
                { key: key },
                { $set: dadosRecebidos },
                { new: true }
            );

            if (!maquininha) {
                return res.status(400).json({ error: 'Tabela não encontrada' });
            }
            return res.json(maquininha);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao atualizar a tabela' });
        }
    }

    async maquininhaDestroy(req, res) {
        const { _id } = req.params
        try {
            const maquininha = await Maquininha.deleteOne(
                { _id: _id },
            )
            if (!maquininha) {
                return res.status(400).json({ error: 'Tabela não encontrada' })
            }
            return res.json(maquininha)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao atualizar a tabela' })
        }

    }
}

export default new MaquininhaController()