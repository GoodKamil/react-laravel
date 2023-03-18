<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StorePostReqister;
use App\Http\Requests\User\StorePostUpdateUser;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository){
        $this->userRepository=$userRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
            return UserResource::collection($this->userRepository->all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostReqister $request)
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

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePostUpdateUser $request, User $user)
    {
        try{
            $data=$request->validated();
            $data['password']=Hash::make($data['password']);
            if($user->update($data)){
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response('',204);
    }
}
