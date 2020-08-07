
var pontos = 0
var erros = 0
var primeiroClique = 0
var primeiraClasse
var primeiroId
var classeAcerto = "acerto"
var totalAcertosGeral = 0
var totalErrosGeral = 0
var guardarPrimeiroTexto
var iniciarJogo = 0
var reiniciarJogo = 0
var guardarCliqueReiniciar = 0
var incrementarIndice = 0
var atualizadoDataLayer = 0
var acessandoDataLayer = []
var i = 0
var contadorParado


function iniciar() {

	iniciarJogo = 1
	contadorParado = true
	return iniciarJogo

}

function reiniciar() {

	resetarAcertos()

	pontos = 0
	erros = 0
	totalAcertosGeral = 0
	totalErrosGeral = 0

	document.getElementById('total-acertos').innerHTML = 0
	document.getElementById('total-acertos-geral').innerHTML = 0
	document.getElementById('total-erros').innerHTML = 0
	document.getElementById('total-erros-geral').innerHTML = 0

	nivel = 1
	creditos = 1
	minutosCredito = 1

	document.getElementById('titulo-nivel').innerHTML = nivel
	document.getElementById('total-creditos').innerHTML = creditos
	

	segundos = 0
	minutos = 0
	horas = 0

	document.getElementById('total-segundos').innerHTML = '00'
	document.getElementById('total-horas').innerHTML = '00'
	document.getElementById('total-minutos').innerHTML = '00'

	reversoSegundos = 60
	reversoMinutos = 0
	segundosFinais = 0

	document.getElementById('total-segundos-reverso').innerHTML = '00'

}

var pegarCorFundoPrimeiroTexto
var pegarCorFundoSegundoTexto
var guardarSegundoTexto
var pegarSegundaClasse

function contarAcertos(ID) {

	if (iniciarJogo == 1 && creditos >= 0 && segundosFinais == 0) {
	/* Primeiro é feito um teste para verificar se o jogo foi iniciado. A variavel iniciarJogo contem zero por default */

		var pegarClasse = document.getElementById(ID).className
		var pegarElemento = document.getElementById(ID)
		

		/* pegarClasse pega a classe atual em css utilizada na palavra que foi clicada. O ID é referente ao ID da palavra clicada. */

		if (primeiroClique == 0) {
		/* primeiroClique por default inicia em zero */
		/* em seguida é adicionado 1 a primeiroClique para o teste condicional não ser executado na próxima vez */
		/* primeiraClasse guarda a classe da palavra do primeiro clique para ser utilizada novamente em outro momento */
		/* primeiroId guarda o ID da primeira palavra clicada para ser utilizada em outro momento */
		/* guardarPrimeiroTexto guarda a primeira palavra clicada para ser atribuida novamente no elemento após os testes condicionais */
		/* Então o document.getElementById(ID).innerHTML escreve substituindo a palavra atual por um texto contendo o nome da classe. */

			primeiroClique = 1
			primeiraClasse = pegarClasse
			primeiroId = ID
			guardarPrimeiroTexto = document.getElementById(ID).textContent
			document.getElementById(ID).innerHTML = pegarClasse
			pegarCorFundoPrimeiroTexto = document.defaultView.getComputedStyle(pegarElemento, null)['backgroundColor']

			// Incluir todas palavras utilizadas no primeiro clique
			// A ideia é tentar identificar um padrão de comportamento
			// Futuramente quero validar se as pessoas tendem a buscar combinações em
			// palavras positivas ou negativas. Além de identificar em qual momento
			// as pessoas tendem a abrir mão de combinações positivas optando então pelas negativas	

		} else {
		/* O else só é executado por que o primeiroClique já possui um valor diferente de 1 */

			pegarCorFundoSegundoTexto = document.defaultView.getComputedStyle(pegarElemento, null)['backgroundColor']
			guardarSegundoTexto = document.getElementById(ID).textContent
			pegarSegundaClasse = document.getElementById(ID).className

			window.dataLayer.push({'Texto1': guardarPrimeiroTexto, 'Texto2': guardarSegundoTexto, 'Classe1': primeiraClasse, 'Classe2': pegarSegundaClasse, 'corFundo1': pegarCorFundoPrimeiroTexto, 'corFundo2': pegarCorFundoSegundoTexto, 'nivel': nivel});

			if (primeiraClasse == pegarClasse && primeiroId != ID && pegarClasse != classeAcerto) {
			/* Então um teste condicional compara a primeiraClasse do primeiro clique com a classe do segundo clique */
			/* que foi pega novamento com pegarClasse no segundo clique. O teste também compara o primeiroID do primeiroClique */
			/* com o ID do segundo clique quando a função contarAcerto é chamada pela segunda vez recebendo o ID do elemento clicado */
			/* e pegarClasse for diferente da classeAcerto. Esse teste evita que a contagem de acertos seja feita em um elemento */
			/* que já foi contado anteriormente como acerto. */

				pontos++
				totalAcertosGeral++
				/* Então um ponto é acrescentado ao nível e ao totalAcertosGeral */
				/* então os pontos são atualizados e a classeAcerto é adicionada na primeira palavra identificada pelo primeiroID */
				/* então o primeiro texto do primeiroClique é adiconado novamente no elemento atráves da variável guardarPrimeiroTexto */
				/* e por último o primeiroClique recebe o valor zero novamente para reiniciar a contagem de acertos */

				document.getElementById('total-acertos').innerHTML = pontos
				document.getElementById('total-acertos-geral').innerHTML = totalAcertosGeral
				document.getElementById(ID).className = classeAcerto
				document.getElementById(primeiroId).className = classeAcerto

				document.getElementById(primeiroId).innerHTML = guardarPrimeiroTexto

				primeiroClique = 0

			} else {
			/* Senão acertar então é adicionado mais um em erros e em totalErrosGeral */
			/* O primeiro texto é adicionado novamente no primeiro elemento e o primeiroClique é zerado novamente */
			/* para reiniciar a contagem no próximo clique */

				erros++
				totalErrosGeral++

				document.getElementById('total-erros').innerHTML = erros
				document.getElementById('total-erros-geral').innerHTML = totalErrosGeral

				document.getElementById(primeiroId).innerHTML = guardarPrimeiroTexto

				primeiroClique = 0

			}

		}
	}
}

function resetarAcertos() {

/* resetarClasse contem todos os elementos com a classe .acerto */
/* testarResetar é utilizada pelo for para executar a sequência em todos os elementos */
/* o for inicia o teste com i em zero. Então compara se i é menor que o total de elementos de resetarClasse.length */
/* ao final de cada for um é acrescentado a i. Então Math.floor pega o menor número inteiro gerado pela por Math.random */
/* Math.random() *10 vai gerar números inteiros aleatórios de 0 a 9;  */
/* A cada for o if verifica se o valor de testarResetar é igual a algum valor de 0 a 9 */
/* se for então um valor de classe é adicionado a um elemento de resetarClasse identificado pela variavel i */
/* o for é executado até que uma nova classe seja adicionada aos elementos com acerto */
/* resetando o jogo e atribuindo novos valores de classes a todas as palavras que foram acertadas */
/* evitando que os jogadores memorizem as classes válidas no nível atual */

	var resetarClasse = document.querySelectorAll(".acerto")
	var testarResetar

	for (var i = 0; i < resetarClasse.length; i++) {

		testarResetar = Math.floor(Math.random() * 10)

		if (testarResetar == 0) {

			resetarClasse[i].className = "subc-01"

		} else if (testarResetar == 1) {

			resetarClasse[i].className = "subc-02"

		} else if (testarResetar == 2) {

			resetarClasse[i].className = "subc-03"

		} else if (testarResetar == 3) {

			resetarClasse[i].className = "subc-04"

		} else if (testarResetar == 4) {

			resetarClasse[i].className = "subc-05"

		} else if (testarResetar == 5) {

			resetarClasse[i].className = "subc-06"

		} else if (testarResetar == 6) {

			resetarClasse[i].className = "subc-07"

		} else if (testarResetar == 7) {

			resetarClasse[i].className = "subc-08"

		} else if (testarResetar == 8) {

			resetarClasse[i].className = "subc-09"

		} else if (testarResetar == 9) {

			resetarClasse[i].className = "subc-10"

		}
	}				
}

var nivel = 1
var creditos = 0
var minutosCredito = 0



function avancarNivel() {
/* Quando a função é chamada ela acrescenta mais um a variável nivel. */
/* Zera o total de acertos do nível e zera o total de erros do nível */
/* Também altera o título para o novo nível. */

	segundos = 0
	reversoSegundos = 60
	
	nivel++
	
	document.getElementById('total-acertos').innerHTML = 0
	document.getElementById('total-erros').innerHTML = 0
	document.getElementById('titulo-nivel').innerHTML = nivel

	resetarAcertos()

	contadorParado = confirm("Parabéns! Vá para o nível "+nivel);


	if (pontos >= 5) {
	/* Se os pontos ao final do tempo do nível for maior ou igual a 5 então um crédito é adicionado */
	/* O total de créditos é atualizado. */

		creditos++
		document.getElementById('total-creditos').innerHTML = creditos		

	}

	erros = 0
	/* os erros do nível são zerados para iniciar o novo nível. */
	/* então a variavel nivel é retornada com o valor atualizado. */
	return nivel
	return contadorParado

}

function repetirNivel() {

	contadorParado = confirm("Repetir Nível");
	return contadorParado

	document.getElementById('total-acertos').innerHTML = pontos
	document.getElementById('total-creditos').innerHTML = creditos	

	resetarAcertos()

	return creditos

}

function gameOver() {

	contadorParado = confirm("Fim de Jogo!");
	return contadorParado
}

function contagemPontos() {
			
			if (nivel == 1 && pontos >= 3 && creditos >= 0) {
			/* É verificado se o jogador está no primeiro nível e se os */
			/* pontos é igual ou maior que 3 e se ainda tem crédidos */
			/* Então o jogador ganha 3 minutos de crédito e os pontos são zerados */
			/* Os segundos finais também é zerado e então o usuário avança de nível. */

				// minutosCredito = 1
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 1 && pontos >= 3 && segundosFinais == 1) {
			/* É verificado se o usuário está no nível um */
			/* se tem pontos suficientes e se segundos finais acabaram*/
			/* então o usuário ganha 3 minutos de crédito */
			/* pontos são zerados, segundos finais também é zerado */
			/* e o usuário avança de nível. */

				minutosCredito = 1
				segundosFinais = 0
				contadorParado = false
				avancarNivel()
				pontos = 0
				return segundosFinais

			} else if (nivel == 1 && pontos < 3 && creditos >= 0) {
			/* Se o usuário estiver no primeiro nível */
			/* e pontos for menor que 3 */
			/* e se o usuário tem ou não crédito*/

				if (segundosFinais == 1) {
				/* se os segundo finais acabaram então é fim de jogo */
					
					contadorParado = false
					gameOver()

				} else {
				
					minutosCredito = 1
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}
				
			} else if (nivel == 2 && pontos >= 3 && creditos >= 0) {

				minutosCredito = 3
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 2 && pontos >= 3 && segundosFinais == 1) {

				minutosCredito = 3
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 2 && pontos < 3 && creditos >= 0) {

				if (segundosFinais == 1) {
					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 3
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}
				
			} else if (nivel == 3 && pontos >= 3 && creditos >= 0) {

				minutosCredito = 3
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 3 && pontos >= 3 && segundosFinais == 1) {

				minutosCredito = 3
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 3 && pontos < 3 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 3
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 4 && pontos >= 7 && creditos >= 0) {

				minutosCredito = 3
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 4 && pontos >= 7 && segundosFinais == 1) {

				minutosCredito = 3
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 4 && pontos < 7 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 3
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 5 && pontos >= 9 && creditos >= 0) {

				minutosCredito = 3
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 5 && pontos >= 9 && segundosFinais == 1) {

				minutosCredito = 3
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 5 && pontos < 9 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 3
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 6 && pontos >= 9 && creditos >= 0) {

				minutosCredito = 3
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 6 && pontos >= 9 && segundosFinais == 1) {

				minutosCredito = 3
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 6 && pontos < 9 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 3
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 7 && pontos >= 10 && creditos >= 0) {

				minutosCredito = 5
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 7 && pontos >= 10 && segundosFinais == 1) {

				minutosCredito = 5
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 7 && pontos < 10 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 5
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 8 && pontos >= 10 && creditos >= 0) {

				minutosCredito = 5
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 8 && pontos >= 10 && segundosFinais == 1) {

				minutosCredito = 5
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 8 && pontos < 10 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 5
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 9 && pontos >= 12 && creditos >= 0) {

				minutosCredito = 5
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 9 && pontos >= 12 && segundosFinais == 1) {

				minutosCredito = 5
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 9 && pontos < 12 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 5
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}

			} else if (nivel == 10 && pontos >= 12 && creditos >= 0) {

				minutosCredito = 5
				contadorParado = false
				avancarNivel()
				pontos = 0
				segundosFinais = 0

			} else if (nivel == 10 && pontos >= 12 && segundosFinais == 1) {

				minutosCredito = 5
				segundosFinais = 0
				return segundosFinais
				contadorParado = false
				avancarNivel()
				pontos = 0

			} else if (nivel == 10 && pontos < 12 && creditos >= 0) {

				if (segundosFinais == 1) {

					contadorParado = false
					gameOver()

				} else {

					minutosCredito = 5
					pontos = 0
					contadorParado = false
					repetirNivel()
					
				}
			} 
}

var segundos = 0
var minutos = 0
var horas = 0
var reversoSegundos = 60
var reversoMinutos = 0
var segundosFinais = 0



function jogoTimer() {

	if (contadorParado == true && iniciarJogo == 1) {

		reversoSegundos--
		segundos++

	}

	if (segundos <= 60 && reversoSegundos >= 0 && contadorParado == true) {

		document.getElementById('total-segundos-reverso').innerHTML = reversoSegundos 
		document.getElementById('total-segundos').innerHTML = '00'

		if (segundos < 60 && reversoSegundos > 0) {

			if (segundos < 10) {
				
				document.getElementById('total-segundos').innerHTML = '0' + segundos

			} else {
				
				document.getElementById('total-segundos').innerHTML = segundos

			}

			if (reversoSegundos < 10) {
				
				document.getElementById('total-segundos-reverso').innerHTML = '0' + reversoSegundos

			} else {

				document.getElementById('total-segundos-reverso').innerHTML = reversoSegundos
			}

			if (reversoSegundos == 59) {
				
				document.getElementById('total-minutos-reverso').innerHTML = '0' + minutosCredito
			}	
		}
			
		if (segundos == 60 && reversoSegundos == 0 && contadorParado == true) {				
		
			document.getElementById('total-segundos-reverso').innerHTML = '0' + reversoSegundos 
			document.getElementById('total-segundos').innerHTML = '00'
			minutos++
			document.getElementById('total-minutos').innerHTML = '0'+ minutos

			if (minutosCredito > 0) {
				minutosCredito--
				segundos = 0
				reversoSegundos = 60

				document.getElementById('total-minutos-reverso').innerHTML = '0' + (minutosCredito + 1)

			} else if (minutosCredito == 0 && creditos == 0) {
											
				segundosFinais++
				return segundosFinais

			} else if (minutosCredito == 0 && creditos > 0) {

				document.getElementById('total-segundos-reverso').innerHTML = '00'
				document.getElementById('total-segundos').innerHTML = '00'	
				
				creditos--
				document.getElementById('total-creditos').innerHTML = creditos

				segundos = 0
				reversoSegundos = 60

				document.getElementById('total-minutos-reverso').innerHTML = '0' + (minutosCredito + 1)
			}
		}
	}

	if (minutos == 60 && contadorParado == true) {

			minutos = 0
			horas++
			document.getElementById('total-minutos').innerHTML = '00'

	} else { 

		if (minutos < 10) {

			document.getElementById('total-minutos').innerHTML = '0'+ minutos
		
		} else {

			document.getElementById('total-minutos').innerHTML = minutos

		}
	}

	if (horas > 0) {

		if (horas < 10) {

			document.getElementById('total-horas').innerHTML = '0'+horas
		
		} 

		if (horas > 9) {

			document.getElementById('total-horas').innerHTML = horas

		}
	}

	if (iniciarJogo == 1 && contadorParado == true) {

		if (segundosFinais == 1) {
									
			contagemPontos()

		} 
	}
}

window.load = setInterval(jogoTimer, 1000)
window.dataLayer = window.dataLayer || [];
  
