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

    protected $fillable = [
        'nome',
        'email',
        'telefone',
        'nome_fantasia',
        'cnpj',
        'endereco_id'
    ];


    public function endereco()
    {
        return $this->belongsTo(Endereco::class);
    }

    public static function persist($data)
    {
        DB::beginTransaction();
        $endereco = Endereco::create($data);
        $data['endereco_id'] = $endereco->id;
        $data['cnpj'] = preg_replace('/[^0-9]/', '', $data['cnpj']);
        $data['telefone'] = preg_replace('/[^0-9]/', '', $data['telefone']);
        $fornecedor = self::create($data);
        DB::commit();
        return $fornecedor;
    }
}
