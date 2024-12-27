<?php

use Finller\Invoice\Invoice;
use Finller\Invoice\InvoiceDiscount;
use Finller\Invoice\InvoiceItem;
use Finller\Invoice\InvoiceType;

$logo = public_path('images/logo.png');

return [
    'model_invoice' => Invoice::class,
    'model_invoice_item' => InvoiceItem::class,
    'discount_class' => InvoiceDiscount::class,
    'cascade_invoice_delete_to_invoice_items' => true,

    'serial_number' => [
        'auto_generate' => true,
        'format' => [
            InvoiceType::Invoice->value => 'PPYY-CCCC', // Simplified format without series
            InvoiceType::Quote->value => 'PPYY-CCCC',
            InvoiceType::Credit->value => 'PPYY-CCCC',
            InvoiceType::Proforma->value => 'PPYY-CCCC',
        ],
        'prefix' => [
            InvoiceType::Invoice->value => 'CK',
            InvoiceType::Quote->value => 'QO',
            InvoiceType::Credit->value => 'CR',
            InvoiceType::Proforma->value => 'PF',
        ],
    ],

    'date_format' => 'Y-m-d',

    'default_seller' => [
        'name' => 'CabutKost',
        'address' => [
            'street' => 'Jalan Buahbatu No. 297A',
            'city' => 'Bandung',
            'postal_code' => '40286',
            'state' => 'Jawa Barat',
            'country' => 'Indonesia',
        ],
        'email' => 'contact@cabutkost.my.id',
        'phone_number' => '+62 821-2130-2002',
        'company_number' => 'CK-2024',
    ],

    'default_currency' => 'IDR',

    'pdf' => [
        'options' => [
            'isPhpEnabled' => true,
            'fontHeightRatio' => 0.9,
            'defaultFont' => 'Helvetica',
        ],
        'paper' => [
            'paper' => 'a4',
            'orientation' => 'portrait',
        ],
        'logo' => $logo,
        'color' => '#050038',
        'template' => 'default.layout',
    ],
];