<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->serial_number }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .invoice-info {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f8f9fa;
        }
        .total {
            text-align: right;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>INVOICE</h1>
        <p>{{ $invoice->serial_number }}</p>
    </div>

    <div class="invoice-info">
        <div style="float: left;">
            <strong>From:</strong><br>
            {{ $invoice->seller_information['name'] }}<br>
            {{ $invoice->seller_information['address']['street'] }}<br>
            {{ $invoice->seller_information['address']['city'] }}, {{ $invoice->seller_information['address']['postal_code'] }}<br>
            {{ $invoice->seller_information['address']['state'] }}, {{ $invoice->seller_information['address']['country'] }}<br>
            Phone: {{ $invoice->seller_information['phone_number'] }}<br>
            Email: {{ $invoice->seller_information['email'] }}
        </div>
        <div style="float: right;">
            <strong>To:</strong><br>
            {{ $invoice->buyer_information['name'] }}<br>
            {{ $invoice->buyer_information['address'] }}<br>
            Email: {{ $invoice->buyer_information['email'] }}
        </div>
        <div style="clear: both;"></div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>{{ $item->label }}</td>
                <td>{{ $item->description }}</td>
                <td>{{ $item->quantity }}</td>
                <td>{{ number_format($item->unit_price, 2) }}</td>
                <td>{{ number_format($item->unit_price * $item->quantity, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        <p><strong>Total: {{ config('invoices.default_currency') }} {{ number_format($invoice->items->sum(function($item) { return $item->unit_price * $item->quantity; }), 2) }}</strong></p>
    </div>
</body>
</html>