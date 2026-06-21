window.bancoDeAntibioticos["vancomicina_ajuste"] = {
    nome: "Vancomicina - Ajuste de dose",
    avaliar: function(peso, clcr, dialise) {
        
        // Parâmetro matemático base
        let dose15 = peso * 15;

        // Estilização padrão das tabelas
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 14px; background-color: #fff;";
        const estiloCelula = "padding: 8px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 10px 0 5px 0; color: #2c3e50; font-size: 15px; font-weight: bold;";
        const estiloInput = "width: 100px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px; box-sizing: border-box;";

        // 1. SEÇÃO DE AVISOS E SEGURANÇA (Aparece Sempre)
        let htmlAvisos = `
            <div style="margin-top: 10px; padding: 12px; background-color: #fff5f5; border-left: 4px solid #e53e3e; border-radius: 4px; font-size: 13px; margin-bottom: 15px;">
                <b style="color: #c53030; font-size: 14px; display: block; margin-bottom: 5px;">🛑 Avisos e Segurança:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li>Infusões mais rápidas que <b>20mg/min</b> aumentam risco de reações adversas graves.</li>
                    <li>Muitas interações consolidadas: <b>monitorar</b>.</li>
                    <li>Vancomicina via oral (<i>Clostridioides difficile</i>): 125 a 500mg de 6/6h.</li>
                </ul>
            </div>
        `;

        // 2. SEÇÃO DE CAMPOS EDITÁVEIS ESPECÍFICOS DO AJUSTE
        let htmlCamposEditaveis = `
            <div style="${estiloTitulo}">Dados do Regime Atual e Vancocinemia</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloCelula}"><b>Dose atual (mg):</b></td>
                        <td style="${estiloCelula}">
                            <input type="number" id="vanco_dose_atual" style="${estiloInput}" step="1" min="0" placeholder="Ex: 1000" oninput="window.atualizarCalculosAjusteVanco()"> mg
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Frequência atual:</b></td>
                        <td style="${estiloCelula}">
                            <select id="vanco_freq_atual" style="width: 100px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px;" onchange="window.atualizarCalculosAjusteVanco()">
                                <option value="8/8h">8/8h</option>
                                <option value="12/12h" selected>12/12h</option>
                                <option value="24/24h">24/24h</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Vancocinemia (mcg/mL):</b></td>
                        <td style="${estiloCelula}">
                            <input type="number" id="vanco_medida" style="${estiloInput}" step="0.1" min="0" placeholder="Ex: 14.5" oninput="window.atualizarCalculosAjusteVanco()">
                        </td>
                    </tr>
                </tbody>
            </table>
        `;

        // 3. CONSTRUTORES DAS TABELAS CONDICIONAIS DE CONDUTA
        let htmlResultadoDose = "";

        if (dialise) {
            htmlResultadoDose = `
                <div id="vanco_bloco_dialise" style="${estiloTitulo}">Dose Ajustada (Paciente Dialítico)</div>
                <table style="${estiloTabela}">
                    <thead><tr><th style="${estiloCelula}; background-color: #f7fafc; text-align: left;">Conduta Recomendada</th></tr></thead>
                    <tbody><tr><td id="vanco_txt_dialise" style="${estiloCelula}; font-weight: 500; color: #2b6cb0;">-</td></tr></tbody>
                </table>
            `;
        } else if (clcr >= 30) {
            htmlResultadoDose = `
                <div id="vanco_bloco_clcr30" style="${estiloTitulo}">Dose Ajustada (ClCr ≥ 30)</div>
                <table style="${estiloTabela}">
                    <thead><tr><th style="${estiloCelula}; background-color: #f7fafc; text-align: left;">Conduta Recomendada</th></tr></thead>
                    <tbody><tr><td id="vanco_txt_clcr30" style="${estiloCelula}; font-weight: 500; color: #2b6cb0;">-</td></tr></tbody>
                </table>
            `;
        } else {
            htmlResultadoDose = `
                <div id="vanco_bloco_clcr_menor30" style="${estiloTitulo}">Dose Ajustada (ClCr < 30)</div>
                <table style="${estiloTabela}">
                    <thead><tr><th style="${estiloCelula}; background-color: #f7fafc; text-align: left;">Conduta Recomendada</th></tr></thead>
                    <tbody><tr><td id="vanco_txt_clcr_menor30" style="${estiloCelula}; font-weight: 500; color: #2b6cb0;">-</td></tr></tbody>
                </table>
            `;
        }

        // 4. TABELA DOSE CUSTOMIZADA (Aparece Sempre)
        let htmlCustomizada = `
            <div style="${estiloTitulo}">Dose Customizada</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloCelula}" width="40%"><b>Dose:</b></td>
                        <td style="${estiloCelula}">
                            <input type="number" id="vanco_ajuste_custom_input" 
                                   style="width: 140px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px;" 
                                   oninput="window.calcularVancoAjusteCustom(this)" placeholder="Digite a dose em mg"> mg
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Diluição mínima:</b></td>
                        <td id="vanco_ajuste_diluicao" style="${estiloCelula}">-</td>
                    </tr>
                    <tr>
                        <td style="${estiloCelula}"><b>Velocidade de infusão mínima:</b></td>
                        <td id="vanco_ajuste_velocidade" style="${estiloCelula}">-</td>
                    </tr>
                </tbody>
            </table>
        `;

        // =========================================================
        // MOTOR LÓGICO DE CÁLCULO EM TEMPO REAL EM OUT-OF-SCOPE
        // =========================================================
        window.atualizarCalculosAjusteVanco = function() {
            let inpDose = document.getElementById("vanco_dose_atual");
            let inpFreq = document.getElementById("vanco_freq_atual");
            let inpVanco = document.getElementById("vanco_medida");

            if (!inpDose || !inpFreq || !inpVanco) return;

            let doseAtual = parseInt(inpDose.value);
            let freq = inpFreq.value;
            let vanco = parseFloat(inpVanco.value);

            // Validação de teto da dose atual
            if (doseAtual > 2250) {
                doseAtual = 2250;
                inpDose.value = 2250;
            }

            // Se algum campo estiver vazio, mantém o traço "-"
            if (isNaN(doseAtual) || isNaN(vanco)) {
                ["vanco_txt_dialise", "vanco_txt_clcr30", "vanco_txt_clcr_menor30"].forEach(id => {
                    let el = document.getElementById(id);
                    if (el) el.innerText = "-";
                });
                return;
            }

            // Tratamento lógico 1: ClCr >= 30
            let txtClCr30 = document.getElementById("vanco_txt_clcr30");
            if (txtClCr30) {
                if (vanco <= 5) {
                    if (freq === "8/8h") txtClCr30.innerText = "Trocar de Antibiótico";
                    else if (freq === "12/12h") txtClCr30.innerText = `${doseAtual} mg de 8/8h`;
                    else if (freq === "24/24h") txtClCr30.innerText = `${doseAtual} mg de 12/12h`;
                } else if (vanco > 5 && vanco <= 10) {
                    txtClCr30.innerText = `${doseAtual + 500} mg de ${freq}`;
                } else if (vanco > 10 && vanco <= 15) {
                    txtClCr30.innerText = `${doseAtual + 250} mg de ${freq}`;
                } else if (vanco > 15 && vanco <= 20) {
                    txtClCr30.innerText = `${doseAtual} mg de ${freq}`;
                } else if (vanco > 20 && vanco <= 25) {
                    txtClCr30.innerText = `${doseAtual - 250} mg de ${freq}`;
                } else if (vanco > 25) {
                    txtClCr30.innerText = "Suspender medicação, monitorar vancocinemia a cada 24h até atingir < 20 mcg/ml, quando atingir < 20 mcg/ml repetir uma dose de 15 mg/kg e checar a vancocinemia após 24h.";
                }
            }

            // Tratamento lógico 2: ClCr < 30
            let txtClCrMenor30 = document.getElementById("vanco_txt_clcr_menor30");
            if (txtClCrMenor30) {
                if (vanco < 20) {
                    txtClCrMenor30.innerText = `${Math.round(dose15).toLocaleString('pt-BR')} mg, coletar nova vancocinemia em 24h`;
                } else {
                    txtClCrMenor30.innerText = "Suspender medicação, coletar nova vancocinemia em 24h";
                }
            }

            // Tratamento lógico 3: Dialítico
            let txtDialise = document.getElementById("vanco_txt_dialise");
            if (txtDialise) {
                if (vanco <= 20) {
                    txtDialise.innerText = `${Math.round(doseAtual + 250).toLocaleString('pt-BR')} mg, coletar vancocinemia antes da próxima HD`;
                } else if (vanco > 20 && vanco <= 30) {
                    txtDialise.innerText = `${Math.round(doseAtual).toLocaleString('pt-BR')} mg, coletar vancocinemia antes da próxima HD`;
                } else {
                    let dMin = doseAtual - 250;
                    let dMax = doseAtual - 500;
                    txtDialise.innerText = `Suspender, repetir vancocinemia a cada 24h, retornar com ${dMin < 0 ? 0 : dMin}mg a ${dMax < 0 ? 0 : dMax}mg após HD`;
                }
            }
        };

        // Função para a tabela customizada (com a limitação de teto de 2.250)
        window.calcularVancoAjusteCustom = function(input) {
            let valor = parseInt(input.value);
            if (isNaN(valor) || valor < 0) {
                document.getElementById("vanco_ajuste_diluicao").innerText = "-";
                document.getElementById("vanco_ajuste_velocidade").innerText = "-";
                return;
            }
            if (valor > 2250) {
                valor = 2250;
                input.value = 2250;
            }
            let dil = Math.round(valor / 10);
            let vel = Math.round(valor / 20);

            document.getElementById("vanco_ajuste_diluicao").innerText = dil + " ml SF / SG%";
            document.getElementById("vanco_ajuste_velocidade").innerText = vel + " minutos";
        };

        // Pequeno atraso seguro para garantir que a árvore DOM mapeou as novas divs antes de rodar os binds
        setTimeout(() => { window.atualizarCalculosAjusteVanco(); }, 50);

        return htmlAvisos + htmlCamposEditaveis + htmlResultadoDose + htmlCustomizada;
    }
};