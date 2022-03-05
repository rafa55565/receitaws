<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="Description" content="Author: Rafael Vinicius Barros Ferreira, Description: Consulta de CNPJ ReceitaWs.">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />

	<title>{{ config('app.name', 'ReceitaWsCrud') }}</title>
	<link rel="dns-prefetch" href="//fonts.gstatic.com">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;display=swap">
	<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

	<link rel="stylesheet" href="{{url(mix('css/main.css'))}}">

	<meta name="msapplication-TileColor" content="#f9f9f9">
	<meta name="theme-color" content="#f9f9f9">
	<script type="text/javascript" async="false" defer="true" src="{{ url(mix('js/main.js')) }}"></script>
</head>

<body class="grey lighten-4" style="overflow-x:auto">
	@include('topo')

	<main class="row">
		@include('menu')

		<section class="container-fluid col-md-9" id="app"></section>
	</main>
</body>
</html>

