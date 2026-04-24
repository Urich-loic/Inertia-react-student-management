<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $permissions = [];
        $users = $request?->user()?->load('roles.permissions');
        if($users){
            foreach($users->roles as $role){
            foreach($role->permissions as $singlePermission){
                $permissions[] = $singlePermission->title;
                
            }
        }

        // collect($permissions)->unique()->map(function($permission){
        //     return [$permission=>true];
        // })->collapse()->dd();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'message' => $request->session()->get('message'),
            'can'=> $users?  collect($permissions)->unique()->map(function($permission){
            return [$permission=>true];
        })->collapse()->toArray():[],

        ];
    }
}
