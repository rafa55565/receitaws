<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $table = 'endereco';
    
    public function pessoas(){
        return $this->belongsToMany(Pessoa::class, 'endereco_id');
    }
}
