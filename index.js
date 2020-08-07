const express = require("express")
const server = express()
const router = express.Router()
const fs = require('fs')

server.use(express.json({extended: true}))

const readFile = () => {
	const content = fs.readFileSync('jogadas.json', 'utf-8')
	return JSON.parse(content)
}

const writeFile = (content) => {
	const updateFile = JSON.stringify(content)
	fs.writeFileSync('jogadas.json', updateFile, 'utf-8')

}

router.get('/', (req, res) => {
	const content = readFile()
	res.send(content)
})

router.post('/', (req, res) => {
	const { PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo } = req.body
	const currentContent = readFile()
	const id = Math.random().toString(32).substr(2, 9)
	currentContent.push({ id, PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo })
	writeFile(currentContent)
	res.send({ id, PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo })
})

router.put('/:id', (req, res) => {
	const {id} = req.params
	const { PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo } = req.body
	
	const currentContent = readFile()
	const selectedItem = currentContent.findIndex((item) => item.id === id)

	const { id: cid, PrimeiroTextoClicado: cPrimeiroTextoClicado, SegundoTextoClicado: cSegundoTextoClicado, PrimeiraClasseClicada: cPrimeiraClasseClicada, SegundaClasseClicada: cSegundaClasseClicada, PrimeiraCorDeFundo: cPrimeiraCorDeFundo, SegundaCorDeFundo: cSegundaCorDeFundo, NivelDoJogo: cNivelDoJogo } = currentContent[selectedItem]

	const newObject = {
		id: cid,
		PrimeiroTextoClicado: PrimeiroTextoClicado ? PrimeiroTextoClicado: cPrimeiroTextoClicado,
		SegundoTextoClicado: SegundoTextoClicado ? SegundoTextoClicado: cSegundoTextoClicado,
		PrimeiraClasseClicada: PrimeiraClasseClicada ? PrimeiraClasseClicada: cPrimeiraClasseClicada,
		SegundaClasseClicada: SegundaClasseClicada ? SegundaClasseClicada: cSegundaClasseClicada,
		PrimeiraCorDeFundo: PrimeiraCorDeFundo ? PrimeiraCorDeFundo: cPrimeiraCorDeFundo,
		SegundaCorDeFundo: SegundaCorDeFundo ? SegundaCorDeFundo: cSegundaCorDeFundo,
		NivelDoJogo: NivelDoJogo ? NivelDoJogo: cNivelDoJogo
	}
	currentContent[selectedItem] = newObject
	writeFile(currentContent)
	res.send(newObject)
})

router.delete('/:id', (req, res) => {
	const { id } = req.params
	const currentContent = readFile()
	const selectedItem = currentContent.findIndex((item) => item.id === id)
	currentContent.splice(selectedItem, 1)
	writeFile(currentContent)
	res.send(true)
})


server.use(router)

server.listen(3000, () => {
	console.log("Rodando servidor NodeJS no talo!")
})
