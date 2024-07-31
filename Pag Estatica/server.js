const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/daysBetweenDates', (req, res) => {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    res.json({ diffDays });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const ventas = [
    { id: 1, numeroFactura: 'FAC001', numeroUnidades: 10, nombreCliente: 'Juana de Arco', valorTotal: 500 },
    { id: 2, numeroFactura: 'FAC002', numeroUnidades: 5, nombreCliente: 'Policarpa Salavarrieta', valorTotal: 250 },
    { id: 3, numeroFactura: 'FAC003', numeroUnidades: 20, nombreCliente: 'Tutankamon', valorTotal: 1000 },
    { id: 4, numeroFactura: 'FAC004', numeroUnidades: 7, nombreCliente: 'Sócrates', valorTotal: 350 },
    { id: 5, numeroFactura: 'FAC005', numeroUnidades: 12, nombreCliente: 'Simón Bolivar', valorTotal: 600 }
];

app.get('/api/totalUnits', (req, res) => {
    const totalUnits = ventas.reduce((sum, sale) => sum + sale.numeroUnidades, 0);
    res.json({ totalUnits });
});

app.get('/api/totalValue', (req, res) => {
    const totalValue = ventas.reduce((sum, sale) => sum + sale.valorTotal, 0);
    res.json({ totalValue });
});

app.get('/api/sale/:id', (req, res) => {
    const sale = ventas.find(s => s.id === parseInt(req.params.id));
    if (sale) {
        res.json(sale);
    } else {
        res.status(404).json({ message: 'Sale not found' });
    }
});

app.get('/api/salesClients', (req, res) => {
    const salesClients = ventas.map(sale => ({ id: sale.id, nombreCliente: sale.nombreCliente }));
    res.json(salesClients);
});

app.post('/api/addSale', express.json(), (req, res) => {
    const { numeroFactura, numeroUnidades, nombreCliente, valorTotal } = req.body;
    const newSale = {
        id: ventas.length + 1,
        numeroFactura,
        numeroUnidades,
        nombreCliente,
        valorTotal
    };
    ventas.push(newSale);
    res.status(201).json(newSale);
});

app.put('/api/decrementValue', express.json(), (req, res) => {
    const { percent } = req.body;
    ventas.forEach(sale => {
        sale.valorTotal -= (sale.valorTotal * (percent / 100));
    });
    res.json({ message: `All sales values have been decreased by ${percent}%` });
});
