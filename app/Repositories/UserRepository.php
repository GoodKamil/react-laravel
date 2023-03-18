<?php

namespace App\Repositories;



use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserRepository
{
    private User $userModel;
    public function __construct(User $userModel)
    {
        $this->userModel=$userModel;
    }

    public function all(): Collection
    {
        return $this->userModel
               ->all();
    }

    public function save(array $params):bool
    {
       return $this->userModel
               ->fill($params)
               ->save();
    }

    public function update(array $params,int $id){
        return $this->userModel
            ->find($id)
            ->update($params);
    }
}
