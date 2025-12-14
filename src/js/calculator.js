// Калькулятор окупаемости ГБО
window.initCalculator = function() {
    console.log('🔧 Инициализация калькулятора...');
    
    const calculatorInputs = ['petrol-price', 'gas-price', 'monthly-mileage', 'fuel-consumption', 'gbo-kit'];
    
    const calculatePayback = () => {
        const values = calculatorInputs.map(id => {
            const el = document.getElementById(id);
            return el ? parseFloat(el.value) : 0;
        });
        
        if (values.some(v => isNaN(v) || v <= 0)) {
            document.getElementById('result').textContent = 'Введіть коректні дані';
            return;
        }
        
        const [petrol, gas, mileage, consumption, gboPrice] = values;
        const monthlyConsumption = (mileage / 100) * consumption;
        const monthlySavings = (monthlyConsumption * petrol) - (monthlyConsumption * gas);
        
        if (monthlySavings <= 0) {
            document.getElementById('result').textContent = 'Не окупиться';
            return;
        }
        
        const months = gboPrice / monthlySavings;
        document.getElementById('result').textContent = 
            months < 1 ? 'Менше 1 місяця' : 
            months > 120 ? 'Більше 10 років' : 
            Math.ceil(months) + ' місяців';
    };
    
    calculatorInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculatePayback);
    });
    
    // Первоначальный расчет
    if (document.getElementById('gbo-kit')) {
        calculatePayback();
    }
    
    console.log('✅ Калькулятор инициализирован');
};