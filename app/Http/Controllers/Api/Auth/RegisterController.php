<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StorePostReqister;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository){
        $this->userRepository=$userRepository;
    }

    public function register(StorePostReqister $request)
    {
        try{
            $data=$request->validated();
            $data['password']=Hash::make($data['password']);
            if($this->userRepository->save($data)){
                return response([
                    'status'=>200,
                    'message'=>'success'
                ]);
            }
            return response([
                'status'=>200,
                'message'=>'Wystąpił problem przy tworzeniu użytkownika'
            ]);
        }catch(Exception $exception){
            return response([
                'status'=>$exception->getCode(),
                'message'=>$exception->getMessage()
            ]);
        }


    }
}
