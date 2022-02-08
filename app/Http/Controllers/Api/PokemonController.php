<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PokemonUpdateRequest;
use App\Http\Resources\PokemonResource;
use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
    	return PokemonResource::collection(Pokemon::latest()->paginate(1000));
    }

    public function show(Pokemon $pokemon)
    {
    	return PokemonResource::make($pokemon);
    }

    public function update(PokemonUpdateRequest $request, Pokemon $pokemon)
    {
		$pokemon->update($request->all());

		return response()->json([
			'message' => 'Updated succefully'
		], 200);
    }
}
