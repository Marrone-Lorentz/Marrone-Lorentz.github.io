window.bancoDeAntibioticos["meropenem"] = {
    nome: "Meropenem",
    avaliar: function(peso, clcr, dialise) {
        if (dialise) {
            return "Dose: 500 mg a cada 24h.<br>Administrar a dose após a sessão nos dias de hemodiálise.";
        }
        if (clcr >= 50) {
            return "Dose: 1g a 2g a cada 8h.<br>Diluição: 100 mL SF 0,9%.<br>Tempo de Infusão: 3 horas (infusão estendida).";
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
