<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFornecedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fornecedor', function (Blueprint $table) {
            $table->id();
            $table->string('nome',255);
            $table->string('email',50);
            $table->string('telefone', 12);
            $table->string('nome_fantasia',50);
            $table->string('cnpj', 18);
            $table->unsignedInteger('endereco_id');

            $table->foreign('endereco_id')->references('id')->on('endereco');            
            // $table->index(['endereco_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fornecedor');
    }
}
