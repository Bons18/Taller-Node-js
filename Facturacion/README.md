# Facturación API

## Endpoints

### Total de unidades facturadas
**GET** `http://localhost:3000/api/totalUnits`

### Valor total facturado
**GET** `http://localhost:3000/api/totalValue`

### Datos de una factura según ID
**GET** `http://localhost:3000/api/sale/:id`

Ejemplo: `http://localhost:3000/api/sale/1`

### ID y nombre del cliente de todas las facturas
**GET** `http://localhost:3000/api/salesClients`

### Agregar una nueva factura
**POST** `http://localhost:3000/api/addSale`

**Body**:
```json
{
    "numeroFactura": "FAC006",
    "numeroUnidades": 15,
    "nombreCliente": "Albert Einstein",
    "valorTotal": 750
}

