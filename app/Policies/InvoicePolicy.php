<?php

namespace App\Policies;

use App\Models\User;
use Finller\Invoice\Invoice;
use Illuminate\Auth\Access\HandlesAuthorization;

class InvoicePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the invoice.
     *
     * @param  \App\Models\User  $user
     * @param  \Finller\Invoice\Invoice  $invoice
     * @return bool
     */
    public function view(User $user, Invoice $invoice)
    {
        // Jika user memiliki role admin
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can create invoices.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function create(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can update the invoice.
     *
     * @param  \App\Models\User  $user
     * @param  \Finller\Invoice\Invoice  $invoice
     * @return bool
     */
    public function update(User $user, Invoice $invoice)
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the invoice.
     *
     * @param  \App\Models\User  $user
     * @param  \Finller\Invoice\Invoice  $invoice
     * @return bool
     */
    public function delete(User $user, Invoice $invoice)
    {
        return $user->role === 'admin';
    }
}