window.bancoDeAntibioticos["amoxicicilina+clavulanato"] = {
    nome: "Amoxicicilina + Clavulanato",
    avaliar: function(peso, clcr, dialise) {
        // Estilização padrão para deixar as tabelas elegantes e responsivas
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 4px; font-size: 14px; background-color: #fff;";
        const estiloHeader = "background-color: #4a5568; color: white; padding: 10px; text-align: left; border: 1px solid #cbd5e0; font-weight: 600;";
        const estiloCelula = "padding: 10px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 4px 0 2px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 3px;";
        let dose40 = peso * 30;
        let diluicao = dose40 * 20;

        return `
            <div class="div-tabela">
                <h5 style="${estiloTitulo}">Acima de 40 Quilos</h5>
                <table style="${estiloTabela}">
                    <thead>
                        <tr>
                            <th style="${estiloHeader}">Posologia</th>
                            <th style="${estiloHeader}">Diluição</th>
                            <th style="${estiloHeader}">Tempo de infusão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="${estiloCelula}">1,2g EV 8/8h</td>
                            <td style="${estiloCelula}">SF 100ml</td>
                            <td style="${estiloCelula}">30-40 minutos</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="div-tabela">
                <h5 style="${estiloTitulo}">Abaixo de 40 Quilos</h5>
                <table style="${estiloTabela}">
                    <thead>
                        <tr>
                            <th style="${estiloHeader}">Posologia</th>
                            <th style="${estiloHeader}">Diluição</th>
                            <th style="${estiloHeader}">Tempo de infusão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="${estiloCelula}">${dose40} miligramas 8/8h</td>
                            <td style="${estiloCelula}">SF ${diluicao}ml</td>
                            <td style="${estiloCelula}">30-40 minutos</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
};
