import Tabela from '../models/TabelaModel.js'

class TabelaController {

    async tabelaCreate(req, res) {
        try {
            const dadosRecebidos = req.body;
            const novaTabela = await Tabela.create(dadosRecebidos);
            return res.json(novaTabela);

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao criar tabela' })
        }
    }

    async tabelaIndex(req, res) {
        try {
            const tabelas = await Tabela.find()
            return res.json(tabelas)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao obter tabelas' })
        }
    }

    async tabelaId(req, res) {
        const { _id } = req.params;
        try {
            const tabela = await Tabela.findOne({ _id: _id })
            if (!tabela) {
                return res.status(404).json({ error: 'Tabela não encontrada' })
            }
            return res.json(tabela)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao buscar tabela pelo ID' })
        }
    }
    async tabelaUpdate(req, res) {
        const { key } = req.params;
        const dadosRecebidos = req.body;

        try {
            const tabela = await Tabela.findOneAndUpdate(
                { key: key },
                { $set: dadosRecebidos },
                { new: true }
            );

            if (!tabela) {
                return res.status(400).json({ error: 'Tabela não encontrada' });
            }
            return res.json(tabela);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao atualizar a tabela' });
        }
    }

    async tabelaDestroy(req, res) {
        const { _id } = req.params
        try {
            const tabela = await Tabela.deleteOne(
                { _id: _id },
            )
            if (!tabela) {
                return res.status(400).json({ error: 'Tabela não encontrada' })
            }
            return res.json(tabela)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao atualizar a tabela' })
        }

    }

    async tabelaAll(req, res) {
        try {
            const tabelas = await Tabela.find();
            return res.json(tabelas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao obter todas as tabelas' });
        }
    }
}

export default new TabelaController()