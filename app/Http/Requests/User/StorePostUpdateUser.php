<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StorePostUpdateUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'firstName'=>'required',
            'lastName'=>'required',
            'email'=>'required|email|unique:users,email,'.$this->id,
            'password'=>'required|confirmed',
        ];
    }

    public function messages():array
    {
        return [
            'firstName.required'=>'Proszę wypełnić pole formularza',
            'lastName.required'=>'Proszę wypełnić pole formularza',
            'email.required'=>'Proszę wypełnić pole formularza',
            'email.email'=>'Niepoprawny adres email',
            'email.unique'=>'Adres email istnieje już w systemie',
            'password.required'=>'Proszę wypełnić pole formularza',
            'password.confirmed'=>'Hasła róznią się od siebie'
        ];
    }
}
