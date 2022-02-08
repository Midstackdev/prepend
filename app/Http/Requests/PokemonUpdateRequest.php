<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PokemonUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'identifier' => 'sometimes|string',
            'species_id' => 'sometimes|integer',
            'height' => 'sometimes|integer',
            'weight' => 'sometimes|integer',
            'base_experience' => 'sometimes|integer',
            'order' => 'sometimes|integer',
        ];
    }
}
