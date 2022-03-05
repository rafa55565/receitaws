<?php

namespace App\Http\Controllers;

use App\Models\Fornecedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForneceddorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resposta  = [];

        try {
            $fornecedores = Fornecedor::select('fornecedor.*');
            $resposta = response()->json($fornecedores->with(['endereco'])->get());
        } catch (\Exception $e) {
            $resposta['errors'][] = $e->getMessage();
        }

        return $resposta;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return $this->show($id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $resposta = [];

        try {
            $fornecedor = Fornecedor::persist($data);
            $resposta['status'] = true;
            $resposta['mensagem'] = 'Fornecedor cadastrado com sucessso!';

            $request->session()->flash('success',  $resposta['mensagem']);
        } catch (\Exception $e) {
            $request->session()->flash('danger', $e->getMessage());
            $resposta['status'] = false;
            $resposta['mensagem'] = $e->getMessage();
            DB::rollBack();
        }

        return $resposta;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $fornecedor = Fornecedor::with(['endereco'])->where('id', $id)->first();

            $resposta = [];
            if (!($fornecedor instanceof Fornecedor)) throw new \Exception("Erro ao encontrar Fornecedor!");

            $resposta['status'] = true;
            $resposta['fornecedor'] = response()->json($fornecedor);
        } catch (\Exception $e) {
            $resposta['status'] = false;
            $resposta['conteudo'] = $e->getMessage();
            throw $e;
        }

        return $resposta;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $resposta = [];

        try {

            DB::beginTransaction();
            $fornecedor = Fornecedor::find($id);
            $fornecedor->nome = $data['nome'];
            $fornecedor->email = $data['email'];
            $fornecedor->telefone =preg_replace('/[^0-9]/', '', $data['telefone']);
            $fornecedor->nome_fantasia = $data['nome_fantasia'];
            $fornecedor->cnpj = preg_replace('/[^0-9]/', '', $data['cnpj']);
            $fornecedor->endereco->cep = $data['cep'];
            $fornecedor->endereco->logradouro = $data['logradouro'];
            $fornecedor->endereco->numero = $data['numero'];
            $fornecedor->endereco->complemento = $data['complemento'];
            $fornecedor->endereco->bairro = $data['bairro'];
            $fornecedor->endereco->cidade = $data['cidade'];
            $fornecedor->endereco->uf = $data['uf'];
            $fornecedor->update();
            $fornecedor->endereco->update();
            DB::commit();

            $resposta['status'] = true;
            $resposta['mensagem'] = 'Fornecedor atualizado com sucessso!';

            $request->session()->flash('success',  $resposta['mensagem']);
        } catch (\Exception $e) {
            $request->session()->flash('danger', $e->getMessage());
            $resposta['status'] = false;
            $resposta['mensagem'] = $e->getMessage();
            DB::rollBack();
        }

        return $resposta;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        try {
            DB::beginTransaction();

            $reponse = [];
            $fornecedores = Fornecedor::where('id', $id)->count();

            if ($fornecedores == 0) {
                throw new \Exception("Erro ao buscar Fornecedor no banco de dados!");
            } else {
                $fornecedor = Fornecedor::find($id);
                $fornecedor->endereco()->delete();
                $fornecedor->delete();
                $resposta['status'] = true;
                $resposta['mensagem'] =  'Fornecedor Deletado com sucesso!';
            }

            DB::commit();
        } catch (\Exception $e) {
            $resposta['status'] = false;
            $resposta['mensagem'] = $e->getMessage();
            DB::rollBack();
        }

        return $resposta;    
    }
}
