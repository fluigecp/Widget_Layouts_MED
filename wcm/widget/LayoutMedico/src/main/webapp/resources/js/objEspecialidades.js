/**
*@description Monta os objetos das especialidades, as funções precisam receber o objeto com os valores que serão tratados e o objeto que será retornado
**/

var obj = {};

function nutricao(dados, profissional, view) {
	//Cabeçalho
	obj.header = {
		nome: profissional,
		dataAtendimento: dados.dataAtendimento
	};

	//Atleta atleta
	obj.atleta = {
		nome: dados.nomeAtleta,
		matricula: dados.docAtleta,
		categoria: dados.categoria,
		modalidade: dados.modalidade,
		piramide: dados.piramide == undefined || dados.piramide == null ? false : dados.piramide,
		comparecimento: dados.comparecimento,
		justificativa: dados.comparecimento == "Não" ? dados.justificado : false,
		descricaoJustificativa: dados.justificado == "Sim" ? dados.descJustificativa : false
	};

	/**
	*@description Caso a conduta esteja preenchida monta o objeto com os dados do atendimento, caso contrario retorna um false
	**/
	if (dados.condutaDietoterapica != "" && dados.condutaDietoterapica !== null) {
		obj.dadosAtendimento = {
			suplementacao: dados.estaSuplementando,
			descricaoSuplementacao: dados.descrcaoHidratacao,
			hidratacao: dados.descricaoSono,
			comoEstaOsono: dados.descricaoSono,
			metodo: dados.metodo,
			condutaDietoterapica: dados.condutaDietoterapica,
			observacoes: dados.observacoes
		};
	} else {
		obj.dadosAtendimento = false;
	}

	/**
	*@description Caso existam dados de alimentação monta o obj com os dados da alimentação
	**/
	if ((dados.almoco != "" && dados.almoco !== null) && (dados.jantar != "" && dados.jantar !== null)) {
		obj.alimentacao = {
			cafeDaManha: dados.cafeDaManha != "" && dados.cafeDaManha !== null ? (dados.cafeDaManha).replace(/\n/gi, "<br>") : " ",
			lancheDaManha: dados.lancheDaManha != "" && dados.lancheDaManha !== null ? (dados.lancheDaManha).replace(/\n/gi, "<br>") : " ",
			almoco: dados.almoco != "" && dados.almoco !== null ? (dados.almoco).replace(/\n/gi, "<br>") : " ",
			lancheDaTarde: dados.lancheDaTarde != "" && dados.lancheDaTarde !== null ? (dados.lancheDaTarde).replace(/\n/gi, "<br>") : " ",
			jantar: dados.jantar != "" && dados.jantar !== null ? (dados.jantar).replace(/\n/gi, "<br>") : " ",
			lancheDaNoite: dados.lancheDaArea != "" && dados.lancheDaArea !== null ? (dados.lancheDaArea).replace(/\n/gi, "<br>") : " ",
			finalDeSemana: dados.fds != "" && dados.fds !== null ? (dados.fds).replace(/\n/gi, "<br>") : " ",
			observacoes: dados.obsAlimentacao != "" && dados.obsAlimentacao !== null ? (dados.obsAlimentacao).replace(/\n/gi, "<br>") : " "
		}
	} else {
		obj.alimentacao = false;
	}

	let avCC = false;

	//Array com os campos que podem estar preenchidos na avaliação
	let avCorp = ['pesoAVCC', 'alturaAVCC', 'dcTriceps', 'dcBiceps', 'dcSubescapula', 'dcSuprailiaca', 'dcCoxa', 'dcPeitoral', 'dcAxilar', 'dcAbdominal',
		'dcPanturrilha', 'sumDobras', 'avCCCintura', 'avCCAbdominal', 'avCCQuadril', 'toracica', 'avCCEnvergadura', 'avCCBracpRelaxDir', 'avCCbracoContraidoDir',
		'avCCCoxaPriximalDir', 'avCCCoxaMedialDir', 'avCCCoxaDistralDir', 'avCCPaturrilhaDir', 'avCCBracoRelaxEsq', 'avCCBracoContraidoEsq', 'avCCCoxaProximalEsq',
		'avCCCoxaMedialEsq', 'avCCCoxaDistralEsq', 'avCCPanturrilhaEsq', 'avCCPerGordura', 'avCCKGGordura', 'avCCPerMM', 'avCCKgMassaMagra'];

	//Laço que verifica se algum dos campos está preenchido
	for (var i = 0; i < avCorp.length; i++) {
		if (dados[avCorp[i]] != "" && dados[avCorp[i]] !== null) {
			avCC = true;
			break; //Não é necessário percorrer todo o array se um dos valores estiver preenchido
		}
	}

	/**
	*@description Caso alguns dos campos da avaliação corporal esteja preenchido monta o objeto da avaliação
	**/
	if (avCC) {
		obj.composicaoCorporal = {
			peso: dados.pesoAVCC != "" && dados.pesoAVCC !== null ? dados.pesoAVCC : "Não informado",
			altura: dados.alturaAVCC != "" && dados.alturaAVCC !== null ? dados.alturaAVCC : "Não informado",
			dcTriceps: dados.dcTriceps != "" && dados.dcTriceps !== null ? dados.dcTriceps : "Não informado",
			dcSubescapular: dados.dcSubescapula != "" && dados.dcSubescapula !== null ? dados.dcSubescapula : "Não informado",
			dcCoxa: dados.dcCoxa != "" && dados.dcCoxa !== null ? dados.dcCoxa : "Não informado",
			dcSuprailiaca: dados.dcSuprailiaca != "" && dados.dcSuprailiaca !== null ? dados.dcSuprailiaca : "Não informado",
			dcPeitoral: dados.dcPeitoral != "" && dados.dcPeitoral !== null ? dados.dcPeitoral : "Não informado",
			dcAxiliar: dados.dcAxilar != "" && dados.dcAxilar !== null ? dados.dcAxilar : "Não informado",
			dcAbdominal: dados.dcAbdominal != "" && dados.dcAbdominal !== null ? dados.dcAbdominal : "Não informado",
			dcPanturrilha: dados.dcPanturrilha != "" && dados.dcPanturrilha !== null ? dados.dcPanturrilha : "Não informado",
			somaDobras: dados.sumDobras != "" && dados.sumDobras !== null ? dados.sumDobras : "Não informado",
			cintura: dados.avCCCintura != "" && dados.avCCCintura !== null ? dados.avCCCintura : "Não informado",
			abdominal: dados.avCCAbdominal != "" && dados.avCCAbdominal !== null ? dados.avCCAbdominal : "Não informado",
			quadril: dados.avCCQuadril != "" && dados.avCCQuadril !== null ? dados.avCCQuadril : "Não informado",
			toracica: dados.toracica != "" && dados.toracica !== null ? dados.toracica : "Não informado",
			envergadura: dados.avCCEnvergadura != "" && dados.avCCEnvergadura !== null ? dados.avCCEnvergadura : "Não informado",
			bracoDireitoRelaxado: dados.avCCBracpRelaxDir != "" && dados.avCCBracpRelaxDir !== null ? dados.avCCBracpRelaxDir : "Não informado",
			bracoDireitoContraido: dados.avCCbracoContraidoDir != "" && dados.avCCbracoContraidoDir !== null ? dados.avCCbracoContraidoDir : "Não informado",
			coxaDireitaProximal: dados.avCCCoxaPriximalDir != "" && dados.avCCCoxaPriximalDir !== null ? dados.avCCCoxaPriximalDir : "Não informado",
			coxaDireitaMedial: dados.avCCCoxaMedialDir != "" && dados.avCCCoxaMedialDir !== null ? dados.avCCCoxaMedialDir : "Não informado",
			coxaDireitaDistral: dados.avCCCoxaDistralDir != "" && dados.avCCCoxaDistralDir !== null ? dados.avCCCoxaDistralDir : "Não informado",
			panturrilhaDireita: dados.avCCPaturrilhaDir != "" && dados.avCCPaturrilhaDir !== null ? dados.avCCPaturrilhaDir : "Não informado",
			bracoEsquerdoRelaxado: dados.avCCBracoRelaxEsq != "" && dados.avCCBracoRelaxEsq !== null ? dados.avCCBracoRelaxEsq : "Não informado",
			bracoEsquerdoContraido: dados.avCCBracoContraidoEsq != "" && dados.avCCBracoContraidoEsq !== null ? dados.avCCBracoContraidoEsq : "Não informado",
			coxaEsquerdaProximal: dados.avCCCoxaProximalEsq != "" && dados.avCCCoxaProximalEsq !== null ? dados.avCCCoxaProximalEsq : "Não informado",
			coxaEsquerdaMedial: dados.avCCCoxaMedialEsq != "" && dados.avCCCoxaMedialEsq !== null ? dados.avCCCoxaMedialEsq : "Não informado",
			coxaEsquerdaDistral: dados.avCCCoxaDistralEsq != "" && dados.avCCCoxaDistralEsq !== null ? dados.avCCCoxaDistralEsq : "Não informado",
			panturrilhaEsquerda: dados.avCCPanturrilhaEsq != "" && dados.avCCPanturrilhaEsq !== null ? dados.avCCPanturrilhaEsq : "Não informado",
			gordura: dados.avCCPerGordura != "" && dados.avCCPerGordura !== null ? dados.avCCPerGordura : "Não informado",
			kgGordura: dados.avCCKGGordura != "" && dados.avCCKGGordura !== null ? dados.avCCKGGordura : "Não informado",
			massaMagra: dados.avCCPerMM != "" && dados.avCCPerMM !== null ? dados.avCCPerMM : "Não informado",
			kgMassaMagra: dados.avCCKgMassaMagra != "" && dados.avCCKgMassaMagra !== null ? dados.avCCKgMassaMagra : "Não informado"
		}
	} else {
		obj.composicaoCorporal = false;
	}

	if (!view) {
		/**
		*@description caso a conduta do primeiro atendimento esteja preenchida monta o objeto
		**/
		if (dados.condutaPrimeiroAtendimento != "" && dados.condutaPrimeiroAtendimento !== null) {
			let cozinha = returnArray("quemCozinha_Opc", 3, dados); //checkbox
			let refeicoes = returnArray("refeicoesFeitasNoClube_Opc", 4, dados); //checkbox
			obj.primeiroAtendimento = {
				telefone: dados.telefoneAtleta != "" && dados.telefoneAtleta !== null ? dados.telefoneAtleta : "Não informado",
				email: dados.telefoneAtleta != "" && dados.telefoneAtleta !== null ? dados.telefoneAtleta : "Não informado",
				estado: dados.ondeMora != "" && dados.ondeMora !== null ? dados.ondeMora : "Não informado",
				cidade: dados.cidades != "" && dados.cidades !== null ? dados.cidades : "Não informado",
				regiao: dados.regiao != "" && dados.regiao !== null ? dados.regiao : false,
				rotinaTreino: dados.rotinaTreino != "" && dados.rotinaTreino !== null ? (dados.rotinaTreino).replace(/\n/gi, "<br>") : "Não informado",
				disposicaoFisica: dados.disposicaoTreino != "" && dados.disposicaoTreino !== null ? (dados.disposicaoTreino).replace(/\n/gi, "<br>") : "Não informado",
				comQuemMora: dados.comQuemMora != "" && dados.comQuemMora !== null ? dados.comQuemMora : "Não informado",
				quemCozinha: cozinha != "" && cozinha !== null ? cozinha : "Não informado",
				sabeCozinhar: dados.sabeCozinhar != "" && dados.sabeCozinhar !== null ? dados.sabeCozinhar : "Não informado",
				especificaComQuemMora: dados.especificarComQuemMora != "" && dados.especificarComQuemMora !== null ? dados.especificarComQuemMora : false,
				especificaQuemCozinha: dados.especificarQuemCozinha != "" && dados.especificarQuemCozinha !== null ? dados.especificarQuemCozinha : false,
				oqSabeCozinhar: dados.exemplosDoQueSabeCozinhar != "" && dados.exemplosDoQueSabeCozinhar !== null ? dados.exemplosDoQueSabeCozinhar : false,
				refeicoesNoClube: refeicoes != "" && refeicoes !== null ? refeicoes : "Não informado",
				trasComida: dados.lachesIntermediarios != "" && dados.lachesIntermediarios !== null ? dados.lachesIntermediarios : "Não informado",
				especificaComida: dados.especifiqueOqueTraz != "" && dados.especifiqueOqueTraz !== null ? (dados.especifiqueOqueTraz).replace(/\n/gi, "<br>") : false,
				possuiAlergia: dados.possuiAlergiasAlimentares != "" && dados.possuiAlergiasAlimentares !== null ? dados.possuiAlergiasAlimentares : "Não informado",
				especifiqueAlergia: dados.especifiqueAlergiasAlimentares != "" && dados.especifiqueAlergiasAlimentares !== null ? (dados.especifiqueAlergiasAlimentares).replace(/\n/gi, "<br>") : false,
				vegetariano: dados.vegetariano != "" && dados.vegetariano !== null ? dados.vegetariano : "Não informado",
				tipoVegetariano: dados.especificacaoVegetariano != "" && dados.especificacaoVegetariano !== null ? dados.especificacaoVegetariano : "Não informado",
				alteracaoExames: dados.alteracoesExames != "" && dados.alteracoesExames !== null ? dados.alteracoesExames : "Não informado",
				especificaAlteracao: dados.especificarALteracaoExame != "" && dados.especificarALteracaoExame !== null ? (dados.especificarALteracaoExame).replace(/\n/gi, "<br>") : false,
				funcionamento: dados.funcionamentoIntestinal != "" && dados.funcionamentoIntestinal !== null ? (dados.funcionamentoIntestinal).replace(/\n/gi, "<br>") : "Não informado",
				diabetico: dados.diabetico != "" && dados.diabetico !== null ? dados.diabetico : "Não informado",
				paiOuMaeDiabetico: dados.paiOuMaeDiabeticos != "" && dados.paiOuMaeDiabeticos !== null ? dados.paiOuMaeDiabeticos : "Não informado",
				tratamento: dados.fazTratamentoMedico != "" && dados.fazTratamentoMedico !== null ? dados.fazTratamentoMedico : "Não informado",
				especificaDiabetico: dados.especificarDiabetes != "" && dados.especificarDiabetes !== null ? dados.especificarDiabetes : false,
				especificaTratamento: dados.esepcificarTratamentoMedico != "" && dados.esepcificarTratamentoMedico !== null ? dados.esepcificarTratamentoMedico : false,
				complexoVitaminico: dados.tomaVitamina != "" && dados.tomaVitamina !== null ? dados.tomaVitamina : "Não informado",
				nutricionista: dados.realizaAcompanhamentoExterno != "" && dados.realizaAcompanhamentoExterno !== null ? dados.realizaAcompanhamentoExterno : "Não informado",
				anticoncepcional: dados.anticoncepcional != "" && dados.anticoncepcional !== null ? dados.anticoncepcional : "Não informado",
				especificaVitamina: dados.especificarVitaminas != "" && dados.especificarVitaminas !== null ? (dados.especificarVitaminas).replace(/\n/gi, "<br>") : false,
				peso: dados.corpoDoAtleta != "" && dados.corpoDoAtleta !== null ? (dados.corpoDoAtleta).replace(/\n/gi, "<br>") : "Não informado",
				suplementosAnteriores: dados.suplementosQueJaUtilizou != "" && dados.suplementosQueJaUtilizou !== null ? (dados.suplementosQueJaUtilizou).replace(/\n/gi, "<br>") : "Não informado",
				suplementosAtuais: dados.suplementosQueUtiliza != "" && dados.suplementosQueUtiliza !== null ? (dados.suplementosQueUtiliza).replace(/\n/gi, "<br>") : "Não informado",
				gatorade: dados.utilizaGatorade != "" && dados.utilizaGatorade !== null ? dados.utilizaGatorade : "Não informado",
				qtd: dados.especificarQtdGatorade != "" && dados.especificarQtdGatorade !== null ? dados.especificarQtdGatorade : "Não informado",
				conduta: dados.condutaPrimeiroAtendimento != "" && dados.condutaPrimeiroAtendimento !== null ? (dados.condutaPrimeiroAtendimento).replace(/\n/gi, "<br>") : "Não informado",
				obs: dados.observacoesPrimeiroAtendimento != "" && dados.observacoesPrimeiroAtendimento !== null ? (dados.observacoesPrimeiroAtendimento).replace(/\n/gi, "<br>") : "Não informado"
			}
		} else {
			obj.primeiroAtendimento = false;
		}
	} else {
		obj.primeiroAtendimento = false;
	}

	return obj;//retorno da função é o obj com os dados que serão exibidos
}

function fisioterapia(dados, profissional, view) {
	//Infos do cabeçalho
	obj.header = {
		nome: profissional,
		dataAtendimento: dados.dataAtendimento
	};
	// Infos do atleta
	obj.atleta = {
		nome: dados.nomeAtleta,
		matricula: dados.docAtleta,
		categoria: dados.categoria,
		modalidade: dados.modalidade,
		piramide: dados.piramide == undefined || dados.piramide == null ? false : dados.piramide,
		comparecimento: dados.comparecimento,
		justificativa: dados.comparecimento == "Não" ? dados.justificado : false,
		descricaoJustificativa: dados.justificado == "Sim" ? dados.justificado : false,
		horaAtendimento: dados.atendidoForaHorario_Opc0
	};

	/**
	*@description Caso a observação esteja preenchida monta o obj
	**/
	if (dados.obsAlta !== "" && dados.obsAlta !== null) {
		obj.observacoes = {
			obsAlta: dados.obsAlta,
			retorno: dados.solicitarRetorno,
			obsRetorno: dados.obsSolicRetorno == "" ? false : dados.obsSolicRetorno,
		};
	} else {
		obj.observacoes = false;
	}

	/**
	*@description Caso o tipo de prevenção esteja preenchido monta o obj
	**/
	if (dados.especificoGeral !== "" && dados.especificoGeral !== null) {
		obj.prevencao = {
			tipo: dados.especificoGeral,
			segmento: dados.especificoGeral == "Especifico" ? getList("preSegmento_", dados) : "<ul><li>Geral</li></ul>",
			lado: dados.especificoGeral == "Especifico" ? getList("preLado_", dados) : "<ul><li>Geral</li></ul>",
			obs: dados.obsPrevensao == "" ? false : dados.obsPrevensao
		}
	} else {
		obj.prevencao = false;
	}

	/**
	*@description Caso a conduta esteja preenchida monta o obj
	**/
	if (dados.conduta !== "" && dados.conduta !== null) {
		obj.evolucao = {
			metodo: returnArray("tratamento_Opc", 5, dados),
			materiais: dados.tratamento_Opc3 == "Bandagem" ? returnArray("materiaisTratamento_Opc", 7, dados) : false,
			conduta: (dados.conduta).replace(/\n/gi, "<br>"),
		}
	} else {
		obj.evolucao = false;
	}

	/**
	*@description Caso o momento esteja preenchido monta o obj da recuperação
	**/
	if (dados.momento !== "" && dados.momento !== null) {
		obj.recuperacao = {
			tratamento: dados.momento,
			especifique: dados.momento == "Outro momento" ? dados.especificarMomento : false,
			local: dados.recuperacaoTreino,
			condutas: returnArray("condutasRecuperacao_Opc", 5, dados),
			obs: dados.obsRecuperacao = "" ? false : dados.obsRecuperacao
		}
	} else {
		obj.recuperacao = false;
	}

	/**
	*@description Caso a emergencia esteja preenchida monta o obj
	**/
	if (dados.descricaoEmergencia != "" && dados.descricaoEmergencia !== null) {
		obj.emergencia = {
			descricao: dados.descricaoEmergencia,
			local: dados.localEmergencia,
			obs: dados.obsEmergencia == "" ? false : dados.obsEmergencia
		}
	} else {
		obj.emergencia = false;
	}

	/**
	*@description Caso o tipo de bandagem esteja preenchido monta o obj
	**/
	if (dados.tipoBandagem != "" && dados.tipoBandagem != null) {
		obj.bandagem = {
			tipo: dados.tipoBandagem,
			materiais: returnArray("materiais_Opc", 7, dados),
			local: dados.bandagemTreino,
			obs: dados.obsBandagem == "" ? false : dados.obsBandagem
		}
	} else {
		obj.bandagem = false;
	}

	/**
	  *@description Caso o nome da competição esteja preenchido monta o obj
	  **/
	if (dados.nomeCompeticao != "" && dados.nomeCompeticao !== null) {
		obj.competicao = {
			nomeCompeticao: dados.nomeCompeticao,
			local: dados.localCompeticao,
			justifica: dados.localCompeticao == "Competição com retorno ao clube" ? dados.localDaViagem : false,
			tipoAtendimento: returnArray("tipoAtendimento_Opc", 5, dados),
			obs: dados.obsCompeticao == "" ? false : dados.obsCompeticao
		}
	} else {
		obj.competicao = false;
	}

	if (!view) {//se não for visualização
		/**
		*@description Caso inicio dos sintomas esteja preenchido monta o obj da avaliação
		**/
		if (dados.dataInicioSintomas != "" && dados.dataInicioSintomas !== null) {
			obj.avaliacao = {
				data: dados.dataInicioSintomas,
				sintomas: dados.descricaoDoAtleta,
				local: dados.localQueEstava,
				especificar: dados.localQueEstava == "Outros" ? dados.especificarLocal : false,
				avaliacao: dados.avaliacao,
				afastado: dados.afastamentoRecuperacao,
				tpAfastamento: dados.afastamentoRecuperacao == "Sim" ? dados.tipoAfastamentoRec : false,
				avSegmento_: getList("avSegmento_", dados),
				avLado_: getList("avLado_", dados),
				avEstrutura_: getList("avEstrutura_", dados),
				avLesao_: getList("avLesao_", dados),
				avFase_: getList("avFase_", dados),
				avCausa_: getList("avCausa_", dados),
				caracteristica: dados.avCaractLesao,
				obs: dados.obsReab == "" ? false : dados.obsReab,
			}
		} else {
			obj.avaliacao = false;
		}
	} else {
		obj.avaliacao = false;
	}

	return obj;
}

function psicologia(dados, profissional, view) {
	//Infos do cabeçalho
	obj.header = {
		nome: profissional,
		dataAtendimento: dados.dataAtendimento
	};
	// Infos do atleta
	obj.atleta = {
		nome: dados.nomeAtleta,
		matricula: dados.docAtleta,
		categoria: dados.categoria,
		modalidade: dados.modalidade,
		piramide: dados.piramide == undefined || dados.piramide == null ? false : dados.piramide,
		comparecimento: dados.comparecimento,
		justificativa: dados.comparecimento == "Não" ? dados.justificado : false,
		descricaoJustificativa: dados.justificado == "Sim" ? dados.justificado : false
	};

	if (!view) {
		/**
		*@description Monta o obj evolucao, informação disponivel apenas para as psicologas
		**/
		obj.evolucao = {
			temas: returnArray("tamasTrabalhados_Opc", 13, dados),
			tecnicas: returnArray("tecnicasTrabalhadas_Opc", 17, dados),
			outrosTemas: dados.especifiqueTema != "" && dados.especifiqueTema != null ? dados.especifiqueTema : false,
			outrosTecnicas: dados.especificarTecnica != "" && dados.especificarTecnica != null ? dados.especificarTecnica : false,
			evoCaso: dados.evolucaoDoCaso,
			resumo: dados.resumoSessao,
			observacoes: dados.observacoes !== null ? dados.observacoes : false
		};
	} else {
		/**
		*@description Obj genérico disponibilizado para todos do departamento
		**/
		obj.evolucao = {
			descricao: (dados.evolucaoDoCaso).replace("\n", "<br>"),
		}
	}

	return obj;
}

function fisiologia(dados, profissional, view) {
	//Infos do cabeçalho
	obj.header = {
		dataAtendimento: dados.dataAtendimento,
		nome: profissional
	}

	// Infos do atleta
	obj.atleta = {
		nome: dados.nomeAtleta,
		matricula: dados.docAtleta,
		idade: dados.idade,
		modalidade: dados.modalidade,
		categoria: dados.categoria,
		piramide: dados.piramide == null ? false : dados.piramide,
		comparecimento: dados.comparecimento,
		justificativa: dados.comparecimento == "Não" ? dados.justificado : false,
		descricaoJustificativa: dados.justificado == "Sim" ? dados.descJustificativa : false
	}

	if (view) {
		/**
		*@description Caso for view apenas este obj generico será compartilhado
		**/
		obj.resumo = {
			descricao: dados.resumoCompartilhado,
		}
	} else {

		/**
		*@description Se visualizado pelo fisiologista estes objetos serão craidos
		**/

		/**
		*@description Caso a evolução esteja preenchida cria o obj
		**/
		if (dados.evolucaoAba != "" && dados.evolucaoAba !== null) {
			obj.evolucao = {
				evolucao: dados.evolucaoAba
			}
		} else {
			obj.evolucao = false;
		}

		/**
		*@description Caso tipo de atestado esteja preenchido cria o obj
		**/
		if (dados.tipoAtestado != "" && dados.tipoAtestado !== null) {
			obj.atestado = {
				tipo: dados.tipoAtestado,
				observacoes: dados.observacoesAtestado
			}
		} else {
			obj.atestado = false;
		}

		/**
		*@description Caso o nome do exame esteja preenchido cria o obj
		**/
		if (dados.nomeExame != "" && dados.nomeExame !== null) {
			obj.exames = {
				tipoExame: dados.nomeExame,
				eletro: dados.retornoEletro
			}

			if ((dados.nomeExame != "" && dados.nomeExame !== null) && dados.nomeExame == "Sangue") {
				obj.sangue = {
					testosteronaTotal: dados.testoTotal,
					testosteronaLivre: dados.testoLivre,
					cortisol: dados.cortisol,
					cpk: dados.cpk,
					ureia: dados.ureia,
					creatina: dados.creatina
				}
			} else {
				obj.sangue = false;
			}

			if ((dados.nomeExame != "" && dados.nomeExame !== null) && dados.nomeExame == "Teste ergométrico") {
				obj.ergometrico = {
					peso: dados.peso,
					altura: dados.altura,
					exameFisico: dados.exFis,
					frequencia: dados.fcTrein,
					velocidade: dados.kmH,
					fcm: dados.fcMax,
					vol: dados.vo2Max
				}
			} else {
				obj.ergometrico = false;
			}
		} else {
			obj.exames = false;
		}

		/**
		*@description Caso diagnostico esteja preenchido cria o obj atendimento
		**/
		if (dados.diagnostico != "" && dados.diagnostico !== null) {
			obj.atendimento = {
				causa: returnArray("tipoInfecaao_Opc", 2, dados),
				local: returnArray("local_Opc", 4, dados),
				causa: returnArray("causaGastro_Opc", 3, dados),
				cid: dados.cid != "" && dados.cid !== null ? dados.cid : "Não informado",
				diagnostico: dados.diagnostico != "" && dados.diagnostico !== null ? dados.diagnostico : "Não informado",
				medicamento: dados.medicamento != "" && dados.medicamento !== null ? dados.medicamento : "Não informado",
				descricao: dados.descricaoTratamento != "" && dados.descricaoTratamento != null ? dados.descricaoTratamento : "",
				suplementacao: dados.suplementacao != "" && dados.suplementacao !== null ? dados.suplementacao : "Não informado",
				descricaoSuplemento: dados.descSuplemento != "" && dados.descSuplemento !== null ? dados.descSuplemento : false,
				resumoConsulta: dados.resumoCompartilhado != "" && dados.resumoCompartilhado !== null ? dados.resumoCompartilhado : "Não informado",
				afastamento: dados.seraAfastado != "" && dados.seraAfastado !== null ? dados.seraAfastado : false,
				tipoAfastamento: dados.tipoAfastamento != "" && dados.tipoAfastamento !== null ? dados.tipoAfastamento : false,
				qtd: dados.qtdNmr != "" && dados.qtdNmr !== null ? dados.qtdNmr : false,
				periodo: dados.periodoSelect != "" && dados.periodoSelect !== null ? dados.periodoSelect : false
			}
		} else {
			obj.atendimento = false;
		}
	}

	return obj;
}

function ortopedia(dados, profissional, view) {
	//Infos do cabeçalho
	obj.header = {
		dataAtendimento: dados.dataAtendimento,
		nome: profissional
	}

	// Infos do atleta
	obj.atleta = {
		nome: dados.nomeAtleta,
		matricula: dados.docAtleta,
		modalidade: dados.modalidade,
		categoria: dados.categoria,
		piramide: dados.piramide,
		sexo: dados.sexo,
		comparecimento: dados.comparecimento,
		justificativa: dados.comparecimento == "Sim" ? false : dados.justificado,
		descricaoJustificativa: dados.justificado == "Não" ? false : dados.descJustificativa,
	}

	if (dados.evolucaoAba != "" && dados.evolucaoAba !== null) {
		obj.evolucao = {
			evolucao: dados.evolucaoAba
		}
	} else {
		obj.evolucaoAba = false;
	}

	if ((dados.rx != "" && dados.rx !== null) || (dados.usg != "" && dados.usg !== null) || (dados.tc != "" && dados.tc !== null) || (dados.rmn != "" && dados.rmn !== null) || (dados.outrosExames != "" && dados.outrosExames !== null)) {
		obj.exames = {
			raiox: dados.rx != "" && dados.rx !== null ? dados.rx : "",
			ultra: dados.usg != "" && dados.usg !== null ? dados.usg : "",
			tomografia: dados.tc != "" && dados.tc !== null ? dados.tc : "",
			ressonancia: dados.rmn != "" && dados.rmn !== null ? dados.rmn : "",
			outros: dados.outrosExames != "" && dados.outrosExames !== null ? dados.outrosExames : "",
		}
	} else {
		obj.exames = false;
	}

	if ((dados.seraAfastado != "" && dados.seraAfastado !== null) || (dados.diagnostico != "" && dados.diagnostico !== null) || (dados.obsExameFisico != "" && dados.obsExameFisico !== null)) {
		let periodo = (dados.qtdNmr != "" && dados.qtdNmr !== null) ? dados.qtdNmr + " " + dados.periodoSelect : false;

		obj.dadosAtendimento = {
			tipo: (returnArray("tipoTrauma_Opc", 2, dados)) !== false ? returnArray("tipoTrauma_Opc", 2, dados) : "Não informado",
			tipoEspecifico: (returnArray("especificaTipo_Opc", 5, dados)) !== false ? returnArray("especificaTipo_Opc", 5, dados) : "Não informado",
			anamnese: dados.complementoAnamnese != "" && dados.complementoAnamnese !== null ? dados.complementoAnamnese : "",
			localizacao: returnArray("localizacao_Opc", 18, dados),
			momento: dados.quandoAconteceu != "" && dados.quandoAconteceu !== null ? dados.quandoAconteceu : "Não informado",
			exameFisico: returnArray("exameFisico_Opc", 8, dados),
			complementoExameFisico: dados.obsExameFisico,
			cid: dados.cid != "" && dados.cid !== null ? dados.cid : "",
			diagnostico: dados.diagnostico != "" && dados.diagnostico !== null ? dados.diagnostico : "",
			medicamento: dados.medicamento != "" && dados.medicamento !== null ? dados.medicamento : "Não informado",
			fisio: dados.fisterapia != "" && dados.fisterapia !== null ? dados.fisterapia : "Não informado",
			complementoTratamento: dados.complementoTratamento != "" && dados.complementoTratamento !== null ? dados.complementoTratamento : "Não informado",
			afastamento: dados.seraAfastado,
			tipoAfastamento: dados.tipoAfastamento != "" && dados.tipoAfastamento !== null ? dados.tipoAfastamento : false,
			periodo: periodo,
			cirurgia: dados.necessitaCirurgia != "" && dados.necessitaCirurgia !== null ? dados.necessitaCirurgia : false,
			observacoes: dados.observacoes != "" && dados.observacoes !== null ? dados.observacoes : ""
		}
	}

	return obj;
}


function getList(name, array) {
	let html = document.createElement("UL");
	let re, reII, valor;
	let retorno = false;
	let str = (Object.keys(array)).toString();
	let regex = name + "\\d{1,2}\\b";
	regex = new RegExp(regex, "g")
	let objUm = str.match(regex);
	if (objUm != null) {
		for (let i = 0; i < objUm.length; i++) {
			valor = array[name + i];
			if (valor !== "" && valor !== null && valor !== undefined) {
				retorno = true;
				let li = document.createElement("LI");
				li.innerHTML = valor;
				html.appendChild(li);
				re = name + i + "_\\d{1,2}\\b";
				re = new RegExp(re, "g");
				let objDois = str.match(re);
				if (objDois != null) {
					let ulII = document.createElement("UL");
					for (let j = 0; j < objDois.length; j++) {
						valor = array[name + i + "_" + j];
						if (valor !== "" && valor !== null && valor !== undefined) {
							let liII = document.createElement("LI");
							liII.innerHTML = valor;
							ulII.appendChild(liII);
							reII = name + i + "_" + j + "_\\d{1,2}\\b";
							reII = new RegExp(reII, "g");
							let objTres = str.match(reII);
							if (objTres != null) {
								let ulIII = document.createElement("UL");
								for (let k = 0; k < objTres.length; k++) {
									valor = array[name + i + "_" + j + "_" + k]
									if (valor !== "" && valor !== null && valor !== undefined) {
										let liIII = document.createElement("LI");
										liIII.innerHTML = valor;
										ulIII.appendChild(liIII);
									}
								}
								ulII.appendChild(ulIII);
							}
						}
					}
					html.appendChild(ulII);
				}
			}
		}
	}
	return retorno ? "<ul>" + html.innerHTML + "</ul>" : false;
}


function returnArray(name, indexes, _return) {
	let html = "<ul>";
	let array = [];
	for (let i = 0; i < indexes; i++) {
		let vl = _return[name + i];
		if (vl != "" && vl != undefined && vl != null) {
			array.push(vl)
			html += "<li>" + vl + "</li>";
		}
	}
	html += "</ul>";
	return array.length > 0 ? html : false;
}
