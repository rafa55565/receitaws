<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Fornecedor extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $table = 'fornecedor';

    public function endereco()
    {
        return $this->hasOne(endereco_id::class, 'endereco_id');
    }

    public static function persist($data)
    {
        DB::beginTransaction();
        $fornecedor = self::create($data);
        DB::commit();
        return $fornecedor;
    }
}
