window.bancoDeAntibioticos["colistina"] = {
    nome: "Colistina",
    avaliar: function(peso, clcr, dialise) {
        // ==========================================
        // 1. DEFINIÇÃO DOS PARÂMETROS MATEMÁTICOS
        // ==========================================
        let dose1p5 = peso * 1.5 * 30000;
        let dose2p5 = peso * 2.5 * 30000;
        let dose2p5_2 = dose2p5 / 2;
        let dose3p8 = peso * 3.8 * 30000;
        let dose3p8_2 = dose3p8 / 2;
        let dose4 = peso * 4 * 30000;
        let dose5 = peso * 5 * 30000;
		let dose5_2 = dose5 / 2;
		let dose5_3 = dose5 / 3;
		let dose5_4 = dose5/ 4;
        let doseSHD = (65 * 30000) / 2;
        let doseCHD = 50 * 30000;

        // Estilização padrão do site
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 14px; background-color: #fff;";
		const estiloHeader = "background-color: #4a5568; color: white; padding: 8px; text-align: left; border: 1px solid #cbd5e0; font-weight: 600;";
        const estiloCelula = "padding: 8px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 10px 0 5px 0; color: #2c3e50; font-size: 15px; font-weight: bold;";

        // FUNÇÃO DE MÁSCARA E CÁLCULO ATUALIZADA PARA FORMATAR MILHARES
        window.calcularColisCustomizada = function(input) {
            // Remove tudo o que não for número puro
            let apenasNumeros = input.value.replace(/\D/g, '');
            
            if (apenasNumeros === '') {
                input.value = '';
                document.getElementById("colis_diluicao").innerText = "-";
                return;
            }

            let valor = parseInt(apenasNumeros);

            // Se o usuário apagar ou digitar 0
            if (isNaN(valor) || valor < 0) {
                document.getElementById("colis_diluicao").innerText = "-";
                return;
            }

            // Atualiza o valor do input aplicando a formatação de pontos (Ex: 1.500.000)
            input.value = valor.toLocaleString('pt-BR');

            // Executa o cálculo da diluição mínima baseado no valor numérico limpo
            let diluicao = Math.round(valor / 90000);
            document.getElementById("colis_diluicao").innerText = diluicao + " ml de SF / SG5%";
        };

        // ==========================================
        // 2. MONTAGEM DAS TABELAS CONDIZENTES
        // ==========================================
        
		 // SEÇÃO DE AVISOS E SEGURANÇA (Aparece Sempre)
        let htmlAvisos = `
            <div style="margin-top: 20px; padding: 12px; background-color: #ebf8ff; border-left: 4px solid #3182ce; border-radius: 4px; font-size: 13px;">
                <b style="color: #2b6cb0; font-size: 14px; display: block; margin-bottom: 5px;">🎯 Indicações:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li>Preferência para <b>ITU</b> (Infeção do Trato Urinário) e via <b>inalatória</b>.</li>
                </ul>
            </div>

            <div style="margin-top: 10px; padding: 12px; background-color: #fffaf0; border-left: 4px solid #dd6b20; border-radius: 4px; font-size: 13px;">
                <b style="color: #dd6b20; font-size: 14px; display: block; margin-bottom: 5px;">🫁 Administração Inalatória:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li><b>Posologia:</b> 75 mg CBA em 4mL de solução salina, 2 a 3 x/dia em nebulizador apropriado (vibratório).</li>
                    <li><b>Reconstituição:</b> Deve ser feito com AD (Água Destilada).</li>
                    <li><b>Ambiente:</b> Realizar em box fechado.</li>
                    <li><b>Protocolo:</b> Consultar a CCIH antes de iniciar.</li>
                </ul>
            </div>

            <div style="margin-top: 10px; padding: 12px; background-color: #f7fafc; border-left: 4px solid #4a5568; border-radius: 4px; font-size: 13px;">
                <b style="color: #2d3748; font-size: 14px; display: block; margin-bottom: 5px;">📋 Cuidados / Monitorização:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li>Monitorizar rigorosamente a nefrotoxicidade, neurotoxicidade e parâmetros respiratórios.</li>
                    <li>Solicitar acompanhamento especializado da equipa de <b>Infectologia</b>.</li>
                </ul>
            </div>
        `;
		
        // TABELA 1: ATAQUE (Aparece Sempre)
        let htmlAtaque = `
            <div style="${estiloTitulo}">Dose de Ataque</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloHeader}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">${dose4.toLocaleString('pt-BR')} UI</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Diluição mínima:</b></td>
                        <td style="${estiloCelula}">${Math.round(dose4 / 90000)} ml de SF / SG5%</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Velocidade de infusão:</b></td>
                        <td style="${estiloCelula}">30 - 60 min</td>
                    </tr>
                </tbody>
            </table>
        `;

        // TABELA 2: MANUTENÇÃO DINÂMICA
        let htmlManutencao = "";

        if (dialise || clcr < 10) {
            // Paciente dialítico ou clearance < 10
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (Paciente Dialítico ou ClCr < 10)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td rowspan="2" style="${estiloHeader}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose 12/12h</td>
                            <td style="${estiloCelula}">${doseSHD.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose pós-HD</td>
                            <td style="${estiloCelula}">${doseCHD.toLocaleString('pt-BR')} UI pós-HD</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="${estiloHeader}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição mínima 12/12h</td>
                            <td style="${estiloCelula}">${Math.round(doseSHD / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição mínima pós-HD</td>
                            <td style="${estiloCelula}">${Math.round(doseCHD / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloHeader}"><b>Velocidade de infusão</b></td>
                            <td style="${estiloCelula}">30-60 min</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr >= 70) {
            // Clearance >= 70
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr ≥ 70)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td rowspan="3" style="${estiloHeader}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose 12/12h</td>
                            <td style="${estiloCelula}">${dose5_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose 8/8h</td>
                            <td style="${estiloCelula}">${dose5_3.toLocaleString('pt-BR')} UI 8/8h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose 6/6h</td>
                            <td style="${estiloCelula}">${dose5_4.toLocaleString('pt-BR')} UI 6/6h</td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="${estiloHeader}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição mínima 12/12h</td>
                            <td style="${estiloCelula}">${Math.round(dose5_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição mínima 8/8h</td>
                            <td style="${estiloCelula}">${Math.round(dose5_3 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição mínima 6/6h</td>
                            <td style="${estiloCelula}">${Math.round(dose5_4 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloHeader}"><b>Velocidade de infusão</b></td>
                            <td style="${estiloCelula}">30-60 min</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr >= 40 && clcr < 70) {
            // Clearance >= 40 e < 70
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr 40 - 69)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td rowspan="2" style="${estiloHeader}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose mínima</td>
                            <td style="${estiloCelula}">${dose2p5_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose máxima</td>
                            <td style="${estiloCelula}">${dose3p8_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="${estiloHeader}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição dose mínima</td>
                            <td style="${estiloCelula}">${Math.round(dose2p5_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição dose máxima</td>
                            <td style="${estiloCelula}">${Math.round(dose3p8_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloHeader}"><b>Velocidade de infusão</b></td>
                            <td style="${estiloCelula}">30-60 min</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr >= 25 && clcr < 40) {
            // Clearance >= 25 e < 40
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr 25 - 39)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td rowspan="2" style="${estiloHeader}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose 24/24h</td>
                            <td style="${estiloCelula}">${dose2p5.toLocaleString('pt-BR')} UI 24/24h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose 12/12h</td>
                            <td style="${estiloCelula}">${dose2p5_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="${estiloHeader}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição mínima 24/24h</td>
                            <td style="${estiloCelula}">${Math.round(dose2p5 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição mínima 12/12h</td>
                            <td style="${estiloCelula}">${Math.round(dose2p5_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloHeader}"><b>Velocidade de infusão</b></td>
                            <td style="${estiloCelula}">30-60 min</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr >= 10 && clcr < 25) { 
            // Clearance >= 10 e < 20 (Alinhado com a regra de 10-24 descrita)
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr 10 - 24)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">${dose1p5.toLocaleString('pt-BR')} UI 36/36h</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima:</b></td>
                            <td style="${estiloCelula}">${Math.round(dose1p5 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão:</b></td>
                            <td style="${estiloCelula}">30 - 60 min</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else {
            // Caso caia em uma faixa residual não coberta (ex: clcr entre 20 e 24,9), garante segurança na tela
            htmlManutencao = `<div style="${estiloTitulo} color: #c53030;">Aguardando dados complementares de função renal...</div>`;
        }

        // TABELA 3: CUSTOMIZADA (Alterada para tipo "text" para aceitar a máscara de pontos)
        let htmlCustomizada = `
            <div style="${estiloTitulo}">Dose Customizada</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloHeader}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">
                            <input type="text" id="colis_custom_input" 
                                   style="width: 140px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px;" 
                                   oninput="window.calcularColisCustomizada(this)" placeholder="Digite a dose em UI"> UI
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Diluição mínima:</b></td>
                        <td id="colis_diluicao" style="${estiloCelula}">-</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Velocidade de infusão:</b></td>
                        <td style="${estiloCelula}">30 - 60 min</td>
                    </tr>
                </tbody>
            </table>
        `;


        // Retorna a junção de todas as tabelas geradas de acordo com as regras estruturadas
        return htmlAvisos + htmlAtaque + htmlManutencao + htmlCustomizada;
    }
};
