<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StorePostLogin;
use App\Models\User;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository){
        $this->userRepository=$userRepository;
    }

    public function login(StorePostLogin $request)
    {
        try{
            $credentials=$request->validated();
            if(!Auth::attempt($credentials))
            {
                return response([
                    'message'=>'Niepoprawny adres email lub hasło'
                ],422);
            }
            /** @var User $user */
            $user=Auth::user();
            $token=$user->createToken('main')->plainTextToken;
            return response(compact('user','token'));
        }catch(Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],422);
        }

    }

    public function logout(Request $request){
        try{
            /** @var User $user */
            $user=$request->user();
            $user->currentAccessToken()->delete();
            return response('',204);
        }catch(Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],422);
        }

    }
}
