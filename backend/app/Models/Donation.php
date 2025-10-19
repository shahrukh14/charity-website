<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $table   = "donations";
    protected $guarded = [];

    public function transaction(){
        return $this->hasOne(Transaction::class, 'donation_id');
    }
}
