window.bancoDeAntibioticos["vancomicina"] = {
    nome: "Vancomicina - Dose inicial",
    avaliar: function(peso, clcr, dialise, idade) {
        // Captura a idade diretamente dos campos globais do sistema
        let idadePac = parseInt(document.getElementById('idade').value) || 0;

        // ==========================================
        // 1. DEFINIÇÃO DOS PARÂMETROS MATEMÁTICOS
        // ==========================================
        let doseataque = peso * 30;
        if (doseataque > 2250) doseataque = 2250;

        let dose15 = peso * 15;

        let dose15p8 = peso * 15;
        if (dose15p8 > 1500) dose15p8 = 1500;

        let dose10 = peso * 10;
        if (dose10 > 1500) dose10 = 1500;

        let dilataque = Math.round(doseataque / 10);
        let dil15 = Math.round(dose15 / 10);
		let dil15p8 = Math.round(dose15p8 / 10);
        let dil10 = Math.round(dose10 / 10);

        let velataque = Math.round(doseataque / 20);
        let vel15 = Math.round(dose15 / 20);
		let vel15p8 = Math.round(dose15p8 / 20);
        let vel10 = Math.round(dose10 / 20);

        // Estilização padrão do site
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 14px; background-color: #fff;";
		const estiloHeader = "background-color: #4a5568; color: white; padding: 8px; text-align: left; border: 1px solid #cbd5e0; font-weight: 600;";
        const estiloCelula = "padding: 8px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 10px 0 5px 0; color: #2c3e50; font-size: 15px; font-weight: bold;";

        // Função global para o cálculo da dose customizada ao vivo
        window.calcularVancoCustomizada = function(input) {
            let valor = parseInt(input.value);
            if (isNaN(valor) || valor < 0) {
                document.getElementById("vanco_diluicao").innerText = "-";
                document.getElementById("vanco_velocidade").innerText = "-";
                return;
            }
            if (valor > 2250) {
                valor = 2250;
                input.value = 2250;
            }
            // Atualiza o valor do input aplicando a formatação de pontos (Ex: 1.500.000)
            input.value = valor.toLocaleString('pt-BR');
			
            let dil = Math.round(valor / 10);
            let vel = Math.round(valor / 20);

            document.getElementById("vanco_diluicao").innerText = dil + " ml SF / SG%";
            document.getElementById("vanco_velocidade").innerText = vel + " minutos";
        };

        // ==========================================
        // 2. SEÇÃO DE AVISOS E SEGURANÇA (Aparece Sempre)
        // ==========================================
        let htmlAvisos = `
            <div style="text-align: center; margin: 10px 0 15px 0;">
                <a href="Vanco.pdf" target="_blank" 
                   style="display: inline-block; padding: 8px 16px; background-color: #4a5568; color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500; transition: background-color 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                   📄 Arquivo fonte Vancomicina
                </a>
            </div>

            <div style="margin-top: 10px; padding: 12px; background-color: #fff5f5; border-left: 4px solid #e53e3e; border-radius: 4px; font-size: 13px; margin-bottom: 15px;">
                <b style="color: #c53030; font-size: 14px; display: block; margin-bottom: 5px;">🛑 Avisos e Segurança:</b>
                <ul style="margin: 0; padding-left: 20px; color: #2d3748; line-height: 1.6;">
                    <li>Infusões mais rápidas que <b>20mg/min</b> aumentam risco de reações adversas graves.</li>
                    <li>Muitas interações consolidadas: <b>monitorar</b>.</li><br>
                    <li><b>Vancomicina via oral (<i>Clostridioides difficile</i>):</b> 125 a 500mg de 6/6h.</li>
                </ul>
            </div>
        `;

        // TABELA 1: ATAQUE (Aparece Sempre)
        let htmlAtaque = `
            <div style="${estiloTitulo}">Dose de Ataque</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloHeader}"><b>Dose</b></td>
                        <td style="${estiloCelula}">${doseataque.toLocaleString('pt-BR')} mg</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                        <td style="${estiloCelula}">${dilataque} ml SF / SG%</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                        <td style="${estiloCelula}">${velataque} minutos</td>
                    </tr>
                </tbody>
            </table>
        `;

        // TABELA 2: MANUTENÇÃO DINÂMICA
        let htmlManutencao = "";

        if (dialise) {
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (Paciente Dialítico)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose</b></td>
                            <td style="${estiloCelula}">${dose10.toLocaleString('pt-BR')} mg após HD</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                            <td style="${estiloCelula}">${dil10} ml SF / SG%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                            <td style="${estiloCelula}">${vel10} minutos</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando coletar 1ª Vancocinemia?</b></td>
                            <td style="${estiloCelula}">30 minutos antes da 3ª dose <br>(Ataque + 2 doses)</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>When repetir Vancocinemia?</b></td>
                            <td style="${estiloCelula}">Antes de cada sessão de HD</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr > 90 && idadePac <= 35) {
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr > 90 e Idade ≤ 35)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose</b></td>
                            <td style="${estiloCelula}">${dose15p8.toLocaleString('pt-BR')} mg de 8/8h</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                            <td style="${estiloCelula}">${dil15p8} ml SF / SG%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                            <td style="${estiloCelula}">${vel15p8} minutos</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando coletar Vancocinemia?</b></td>
                            <td style="${estiloCelula}">30 minutos antes da 4ª dose <br>(Ataque + 3 doses)</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando repetir Vancocinemia?</b></td>
                            <td style="${estiloCelula}">Sempre 30 minutos antes da 4ª dose pós ajuste</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr > 90 && idadePac > 35) {
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr > 90 e Idade > 35)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose</b></td>
                            <td style="${estiloCelula}">${dose15.toLocaleString('pt-BR')} mg de 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                            <td style="${estiloCelula}">${dil15} ml SF / SG%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                            <td style="${estiloCelula}">${vel15} minutos</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando coletar Vancocinemia?</b></td>
                            <td style="${estiloCelula}">30 minutos antes da 4ª dose <br>(Ataque + 3 doses)</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando repetir Vancocinemia?</b></td>
                            <td style="${estiloCelula}">Sempre 30 minutos antes da 4ª dose pós ajuste</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr >= 50 && clcr <= 90) {
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr 50 - 90)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose</b></td>
                            <td style="${estiloCelula}">${dose15.toLocaleString('pt-BR')} mg de 12/12h</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                            <td style="${estiloCelula}">${dil15} ml SF / SG%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                            <td style="${estiloCelula}">${vel15} minutos</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando coletar Vancocinemia?</b></td>
                            <td style="${estiloCelula}">30 minutos antes da 4ª dose <br>(Ataque + 3 doses)</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando repetir Vancocinemia?</b></td>
                            <td style="${estiloCelula}">Sempre 30 minutos antes da 4ª dose pós ajuste</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr >= 30 && clcr < 50) {
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr 30 - 50)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose</b></td>
                            <td style="${estiloCelula}">${dose15.toLocaleString('pt-BR')} mg de 24/24h</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                            <td style="${estiloCelula}">${dil15} ml SF / SG%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                            <td style="${estiloCelula}">${vel15} minutos</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando coletar Vancocinemia?</b></td>
                            <td style="${estiloCelula}">30 minutos antes da 3ª dose <br>(Ataque + 2 doses)</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando repetir Vancocinemia?</b></td>
                            <td style="${estiloCelula}">Sempre 30 minutos antes da 3ª dose pós ajuste</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (clcr < 30) {
            htmlManutencao = `
                <div style="${estiloTitulo}">Dose de Manutenção (ClCr < 30)</div>
                <table style="${estiloTabela}">
                    <tbody>
                        <tr>
                            <td style="${estiloHeader}"><b>Dose</b></td>
                            <td style="${estiloCelula}">${dose15.toLocaleString('pt-BR')} mg de 24/24h</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                            <td style="${estiloCelula}">${dil15} ml SF / SG%</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                            <td style="${estiloCelula}">${vel15} minutos</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando coletar Vancocinemia?</b></td>
                            <td style="${estiloCelula}">30 minutos antes da 2ª dose <br>(Ataque + 1 dose)</td>
                        </tr>
                        <tr>
                            <td style="${estiloHeader}"><b>Quando repetir Vancocinemia?</b></td>
                            <td style="${estiloCelula}">Sempre 30 minutos antes da próxima dose</td>
                        </tr>
                    </tbody>
                </table>
            `;
        }

        // TABELA 3: CUSTOMIZADA (Aparece Sempre)
        let htmlCustomizada = `
            <div style="${estiloTitulo}">Dose Customizada</div>
            <table style="${estiloTabela}">
                <tbody>
                    <tr>
                        <td style="${estiloHeader}"><b>Dose</b></td>
                        <td style="${estiloCelula}">
                            <input type="text" id="vanco_custom_input" 
                                   style="width: 140px; padding: 4px; border: 1px solid #cbd5e0; border-radius: 4px;" 
                                   oninput="window.calcularVancoCustomizada(this)" placeholder="Digite a dose em mg"> mg
                        </td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Diluição mínima</b></td>
                        <td id="vanco_diluicao" style="${estiloCelula}">-</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Velocidade de infusão mínima</b></td>
                        <td id="vanco_velocidade" style="${estiloCelula}">-</td>
                    </tr>
                    <tr>
                        <td style="${estiloHeader}"><b>Quando coletar 1ª Vancocinemia?</b></td>
                        <td style="${estiloCelula}">confira na tabela anterior</td>
                    </tr>
                </tbody>
            </table>
        `;

        return htmlAvisos + htmlAtaque + htmlManutencao + htmlCustomizada;
    }
};
