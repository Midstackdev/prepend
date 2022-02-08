<?php

use App\Http\Controllers\Api\PokemonController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/pokemons', [PokemonController::class, 'index'])->name('pokemon.index');
Route::get('/pokemons/{pokemon:id}', [PokemonController::class, 'show'])->name('pokemon.show');
Route::put('/pokemons/{pokemon:id}', [PokemonController::class, 'update'])->name('pokemon.update');
