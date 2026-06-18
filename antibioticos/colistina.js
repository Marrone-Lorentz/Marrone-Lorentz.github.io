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
        let doseSHD = (65 * 30000) / 2;
        let doseCHD = 50 * 30000;

        // Estilização padrão do site
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 14px; background-color: #fff;";
        const estiloCelula = "padding: 8px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 10px 0 5px 0; color: #2c3e50; font-size: 15px; font-weight: bold;";

        // Função global para o campo customizado rodar na hora
        window.calcularColisCustomizada = function(input) {
            let valor = parseInt(input.value);
            if (isNaN(valor) || valor < 0) {
                document.getElementById("colis_diluicao").innerText = "-";
                return;
            }
            let diluicao = Math.round(valor / 90000);
            document.getElementById("colis_diluicao").innerText = diluicao + " ml de SF / SG5%";
        };

        // ==========================================
        // 2. MONTAGEM DAS TABELAS CONDIZENTES
        // ==========================================
        
        // TABELA 1: ATAQUE (Aparece Sempre)
        let htmlAtaque = `
            <div style="${estiloTitulo}">Dose de Ataque</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloCelula}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">${dose4.toLocaleString('pt-BR')} UI</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Diluição:</b></td>
                        <td style="${estiloCelula}">${Math.round(dose4 / 90000)} ml de SF / SG5%</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Velocidade de infusão:</b></td>
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
                            <td rowspan="2" style="${estiloCelula}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose 12/12h</td>
                            <td style="${estiloCelula}">${doseSHD.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose pós-HD</td>
                            <td style="${estiloCelula}">${doseCHD.toLocaleString('pt-BR')} UI pós-HD</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="${estiloCelula}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição 12/12h</td>
                            <td style="${estiloCelula}">${Math.round(doseSHD / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição pós-HD</td>
                            <td style="${estiloCelula}">${Math.round(doseCHD / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloCelula}"><b>Velocidade de infusão</b></td>
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
                            <td style="${estiloCelula}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">${dose5.toLocaleString('pt-BR')} UI/dia</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">${Math.round(dose5 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}"><b>Velocidade de infusão:</b></td>
                            <td style="${estiloCelula}">30 - 60 min</td>
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
                            <td rowspan="2" style="${estiloCelula}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose mínima</td>
                            <td style="${estiloCelula}">${dose2p5_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose máxima</td>
                            <td style="${estiloCelula}">${dose3p8_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="${estiloCelula}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição mínima</td>
                            <td style="${estiloCelula}">${Math.round(dose2p5_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição máxima</td>
                            <td style="${estiloCelula}">${Math.round(dose3p8_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloCelula}"><b>Velocidade de infusão</b></td>
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
                            <td rowspan="2" style="${estiloCelula}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">Dose 24/24h</td>
                            <td style="${estiloCelula}">${dose2p5.toLocaleString('pt-BR')} UI 24/24h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Dose 12/12h</td>
                            <td style="${estiloCelula}">${dose2p5_2.toLocaleString('pt-BR')} UI 12/12h</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="${estiloCelula}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">Diluição 24/24h</td>
                            <td style="${estiloCelula}">${Math.round(dose2p5 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Diluição 12/12h</td>
                            <td style="${estiloCelula}">${Math.round(dose2p5_2 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="${estiloCelula}"><b>Velocidade de infusão</b></td>
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
                            <td style="${estiloCelula}"><b>Dose:</b></td>
                            <td style="${estiloCelula}">${dose1p5.toLocaleString('pt-BR')} UI 36/36h</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}"><b>Diluição:</b></td>
                            <td style="${estiloCelula}">${Math.round(dose1p5 / 90000)} ml de SF / SG5%</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}"><b>Velocidade de infusão:</b></td>
                            <td style="${estiloCelula}">30 - 60 min</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else {
            // Caso caia em uma faixa residual não coberta (ex: clcr entre 20 e 24,9), garante segurança na tela
            htmlManutencao = `<div style="${estiloTitulo} color: #c53030;">Aguardando dados complementares de função renal...</div>`;
        }

        // TABELA 3: CUSTOMIZADA (Aparece Sempre)
        let htmlCustomizada = `
            <div style="${estiloTitulo}">Dose Customizada</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloCelula}"><b>Dose:</b></td>
                        <td style="${estiloCelula}">
                            <input type="number" id="colis_custom_input" step="1" min="0"
                                   style="width: 140px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px;" 
                                   oninput="window.calcularColisCustomizada(this)" placeholder="Digite a dose em UI"> UI
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Diluição mínima:</b></td>
                        <td id="colis_diluicao" style="${estiloCelula}">-</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Velocidade de infusão:</b></td>
                        <td style="${estiloCelula}">30 - 60 min</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Retorna a junção de todas as tabelas geradas de acordo com as regras estruturadas
        return htmlAtaque + htmlManutencao + htmlCustomizada;
    }
};