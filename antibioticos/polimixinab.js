window.bancoDeAntibioticos["polimixina"] = {
    nome: "Polimixina B",
    avaliar: function(peso, clcr, dialise) {
        // 1. Definição e limites dos parâmetros baseados no peso
        let dose15 = peso * 15000;
        if (dose15 > 2500000) dose15 = 2500000;

        let dose15_2 = (peso * 15000) / 2;
        if (dose15_2 > 2500000) dose15_2 = 2500000;

        let dose25 = peso * 25000;
        // O parâmetro dose25 em si não tem teto no enunciado, mas a exibição na tabela sim

        let dose25_2 = (peso * 25000) / 2;
        if (dose25_2 > 2500000) dose25_2 = 2500000;

        // Regras de exibição da Tabela 1 (Ataque)
        let exibeDose25 = dose25 > 2500000 ? 2500000 : dose25;
        let diluicaoAtaque = Math.round(dose25 / 3000);
        let velocidadeAtaque = exibeDose25 <= 1000000 ? "60 minutos" : "90-120min";

        // Regras de exibição da Tabela 2 (Manutenção)
        let velMinManutencao = dose15_2 <= 1000000 ? "60 minutos" : "90-120min";
        let velMaxManutencao = dose25_2 <= 1000000 ? "60 minutos" : "90-120min";

        // Estilização das tabelas
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 14px; background-color: #fff;";
        const estiloHeader = "background-color: #4a5568; color: white; padding: 8px; text-align: left; border: 1px solid #cbd5e0; font-weight: 600;";
        const estiloCelula = "padding: 8px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 10px 0 5px 0; color: #2c3e50; font-size: 15px; font-weight: bold;";

        // Criamos uma função global temporária para calcular a dose customizada ao vivo
        // FUNÇÃO DE MÁSCARA E CÁLCULO PARA FORMATAR MILHARES (POLIMIXINA)
        window.calcularPoliCustomizada = function(input) {
            // Remove tudo o que não for número puro
            let apenasNumeros = input.value.replace(/\D/g, '');
            
            if (apenasNumeros === '') {
                input.value = '';
                document.getElementById("poli_diluicao").innerText = "-";
                return;
            }

            let valor = parseInt(apenasNumeros);

            // Se o usuário apagar ou digitar 0
            if (isNaN(valor) || valor < 0) {
                document.getElementById("poli_diluicao").innerText = "-";
                return;
            }
			
			// TRAVA DE SEGURANÇA: Limita o teto máximo em 2.500.000 UI
			if (valor > 2500000){
				valor = 2500000;
			}

            // Atualiza o valor do input aplicando a formatação de pontos (Ex: 1.500.000)
            input.value = valor.toLocaleString('pt-BR');

            // Executa o cálculo da diluição mínima baseado no valor numérico da Polimixina
            // Nota: Mantenha a fórmula de cálculo que você já usava originalmente para a Polimixina aqui
            let diluicao = Math.round(valor / 3000); 
            document.getElementById("poli_diluicao").innerText = diluicao + " ml de SF / SG5%";
        };

        return `
			<div style="margin-top: 20px; padding: 12px; background-color: #fff5f5; border-left: 4px solid #e53e3e; border-radius: 4px; font-size: 13px;">
                <b style="color: #c53030; font-size: 14px; display: block; margin-bottom: 5px;">🛑 Contraindicações / Alertas:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li><b>Não usar em ITU:</b> Baixa penetração no parênquima renal e eliminação urinária em forma inativa.</li>
                    <li><b>Incompatibilidade em Y-site:</b> Incompatível com infusão rápida (IR) em bomba de infusão contínua (BIC) — utilizar acessos distintos.</li>
                    <li><b>Uso concomitante com curare:</b> Evitar. A polimixina potencializa o bloqueio neuromuscular.</li>
                    <li><b>Dose máxima diária:</b> Não exceder 2.500.000 UI por dia.</li>
                </ul>
            </div>

            <div style="margin-top: 10px; padding: 12px; background-color: #f7fafc; border-left: 4px solid #4a5568; border-radius: 4px; font-size: 13px;">
                <b style="color: #2d3748; font-size: 14px; display: block; margin-bottom: 5px;">📋 Cuidados / Monitorização:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li>Monitorar rigorosamente nefrotoxicidade, neurotoxicidade e parâmetros respiratórios.</li>
                    <li>Solicitar acompanhamento especializado da comissão ou equipe de <b>Infectologia</b>.</li>
                </ul>
            </div>
		
            <div style="${estiloTitulo}">Dose de Ataque</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloHeader}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">${exibeDose25.toLocaleString('pt-BR')} UI</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Diluição mínima:</b></td>
                        <td style="${estiloCelula}">${diluicaoAtaque} ml de SG5%</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Velocidade de infusão:</b></td>
                        <td style="${estiloCelula}">${velocidadeAtaque}</td>
                    </tr>
                </tbody>
            </table>

            <div style="${estiloTitulo}">Dose de Manutenção</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td rowspan="2" style="${estiloHeader}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">Dose mínima</td>
                        <td style="${estiloCelula}">${dose15_2.toLocaleString('pt-BR')} UI 12/12h</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}">Dose máxima</td>
                        <td style="${estiloCelula}">${dose25_2.toLocaleString('pt-BR')} UI 12/12h</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="${estiloHeader}"><b>Diluição:</b></td>
                        <td style="${estiloCelula}">Diluição mínima</td>
                        <td style="${estiloCelula}">${Math.round(dose15_2 / 3000)} ml de SG5%</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}">Diluição máxima</td>
                        <td style="${estiloCelula}">${Math.round(dose25_2 / 3000)} ml de SG5%</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="${estiloHeader}"><b>Velocidade de infusão:</b></td>
                        <td style="${estiloCelula}">Velocidade mínima</td>
                        <td style="${estiloCelula}">${velMinManutencao}</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}">Velocidade máxima</td>
                        <td style="${estiloCelula}">${velMaxManutencao}</td>
                    </tr>
                </tbody>
            </table>

            <div style="${estiloTitulo}">Dose Customizada</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloHeader}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">
                            <input type="text" id="poli_custom_input" 
                                   style="width: 140px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px;" 
                                   oninput="window.calcularPoliCustomizada(this)" placeholder="Digite a dose em UI"> UI
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Diluição mínima:</b></td>
                        <td id="poli_diluicao" style="${estiloCelula}">-</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Velocidade de infusão:</b></td>
                        <td id="poli_velocidade" style="${estiloCelula}">-</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
};
