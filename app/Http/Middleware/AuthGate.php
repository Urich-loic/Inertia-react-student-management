<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class AuthGate
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $permissions = [];
        $users = $request?->user()?->load('roles.permissions');
        if($users){
            foreach($users->roles as $role){
            foreach($role->permissions as $singlePermission){
                $permissions[] = $singlePermission->title;
                
            }
        }

        collect($permissions)->unique()->map(function($permission){
            Gate::define($permission, function () {
                return true;
            });
        });
        }
        return $next($request);
    }
}
