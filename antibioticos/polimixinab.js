window.bancoDeAntibioticos["polimixinab"] = {
    nome: "Polimixina B",
    avaliar: function(peso, clcr, dialise) {
        // Estilização padrão para deixar as tabelas elegantes e responsivas
        const estiloTabela = "width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; background-color: #fff;";
        const estiloHeader = "background-color: #4a5568; color: white; padding: 10px; text-align: left; border: 1px solid #cbd5e0; font-weight: 600;";
        const estiloCelula = "padding: 10px; border: 1px solid #cbd5e0; color: #2d3748;";
        const estiloTitulo = "margin: 15px 0 8px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 3px;";
        let dose15 = peso * 15000;
        let dose25 = peso * 25000;
        let diluicao15 = dose15 / 3000;
        let diluicao25 = dose25 / 3000;
      
        if (dialise) {
            return "Dose: 500 mg a cada 24h.<br>Administrar a dose após a sessão nos dias de hemodiálise.";
        }
        if (clcr >= 50 && dose25 < 2500000) {
            return "Ataque:<br>Dose: ${dose25}UI imediato.<br>Diluição mínima: ${diluicao25} mL SG 5%.<br>Tempo de Infusão: if (dose25 <= 1000000) {return "60 minutos"} if (dose25 > 1000000) {return "90 a 120 minutos"}<br><br>Manutenção:<br>${dose25 / 2}UI de 12/12h diluído em ${diluicao25 / 2}ml de SG 5%";
        }
        if (clcr >= 26 && clcr < 50) {
            return "Dose: 1g a cada 12h.<br>Diluição: 100 mL SF 0,9%.<br>Tempo de Infusão: 3 horas.";
        }
        if (clcr >= 10 && clcr <= 25) {
            return "Dose: 500 mg a cada 12h.";
        }
        if (clcr < 10) {
            return "Dose: 500 mg a cada 24h.";
        }
        return "Dados clínicos insuficientes para gerar a recomendação.";
    }
};
