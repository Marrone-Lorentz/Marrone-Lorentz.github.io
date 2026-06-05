window.bancoDeAntibioticos["ceftriaxona"] = {
    nome: "Ceftriaxona",
    avaliar: function(peso, clcr, dialise) {
        // Estilização padrão para deixar as tabelas elegantes e responsivas
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 4px; font-size: 14px; background-color: #fff;";
        const estiloHeader = "background-color: #4a5568; color: white; padding: 10px; text-align: left; border: 1px solid #cbd5e0; font-weight: 600;";
        const estiloCelula = "padding: 10px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 4px 0 2px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 3px;";

        return `
            <div class="div-tabela">
                <h5 style="${estiloTitulo}">Tratamento Empírico</h5>
                <table style="${estiloTabela}">
                    <thead>
                        <tr>
                            <th style="${estiloHeader}">Clearance</th>
                            <th style="${estiloHeader}">Dose</th>
                            <th style="${estiloHeader}">Diluição</th>
                            <th style="${estiloHeader}">Tempo de infusão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="${estiloCelula}">Qualquer clearance</td>
                            <td style="${estiloCelula}">2 gramas EV 24/24h</td>
                            <td style="${estiloCelula}">SF/SG5% 50-100ml</td>
                            <td style="${estiloCelula}">30min ou IV direto: 3-5min</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="div-tabela">
                <h5 style="${estiloTitulo}">Profilaxia</h5>
                <table style="${estiloTabela}">
                    <thead>
                        <tr>
                            <th style="${estiloHeader}">Clearance</th>
                            <th style="${estiloHeader}">Dose</th>
                            <th style="${estiloHeader}">Diluição</th>
                            <th style="${estiloHeader}">Tempo de infusão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="${estiloCelula}">Qualquer clearance</td>
                            <td style="${estiloCelula}">1 grama EV 24/24h</td>
                            <td style="${estiloCelula}">SF/SG5% 50-100ml</td>
                            <td style="${estiloCelula}">30min ou IV direto: 3-5min</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="div-tabela">
                <h5 style="${estiloTitulo}">Tratamento de Meningite</h5>
                <table style="${estiloTabela}">
                    <thead>
                        <tr>
                            <th style="${estiloHeader}">Clearance</th>
                            <th style="${estiloHeader}">Dose</th>
                            <th style="${estiloHeader}">Diluição</th>
                            <th style="${estiloHeader}">Tempo de infusão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="${estiloCelula}">Qualquer clearance</td>
                            <td style="${estiloCelula}">4 gramas 24/24h</td>
                            <td style="${estiloCelula}">SF/SG5% 80-100ml</td>
                            <td style="${estiloCelula}">30min ou IV direto: 3-5min</td>
                        </tr>
                        <tr>
                            <td style="${estiloCelula}">Qualquer clearance</td>
                            <td style="${estiloCelula}">2 gramas 12/12h</td>
                            <td style="${estiloCelula}">SF/SG5% 50-100ml</td>
                            <td style="${estiloCelula}">30min ou IV direto: 3-5min</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
};
