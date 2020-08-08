const express = require("express")
const server = express()
const cors = require('cors')
const router = express.Router()
const fs = require('fs')

server.use(express.json({extended: true}))

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
	//res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
	//res.setHheader('Access-Control-Allow-Credentials', true);
	//res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	server.use(cors())
	next()
})

const readFile = () => {
	const content = fs.readFileSync('jogadas.json', 'utf-8')
	return JSON.parse(content)
}

const writeFile = (content) => {
	const updateFile = JSON.stringify(content)
	fs.writeFileSync('jogadas.json', updateFile, 'utf-8')

}

router.get('/', (req, res, next) => {
	const content = readFile()
	res.send(content)
})

router.post('/', (req, res, next) => {
	const { PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo } = req.body
	const currentContent = readFile()
	const id = Math.random().toString(32).substr(2, 9)
	currentContent.push({ id, PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo })
	writeFile(currentContent)
	console.log(currentContent)
	res.send({ id, PrimeiroTextoClicado, SegundoTextoClicado, PrimeiraClasseClicada, SegundaClasseClicada, PrimeiraCorDeFundo, SegundaCorDeFundo, NivelDoJogo })
})

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
	const { id } = req.params
	const currentContent = readFile()
	const selectedItem = currentContent.findIndex((item) => item.id === id)
	currentContent.splice(selectedItem, 1)
	writeFile(currentContent)
	res.send(true)
})


server.use(router)

server.listen(3000, () => {
	//console.log("Rodando servidor NodeJS no talo!")
})
