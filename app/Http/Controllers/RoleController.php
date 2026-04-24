<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\PersmissionControllerResource;
use App\Http\Resources\RoleControllerResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class RoleController extends Controller
{
   public function index()
    {
        Gate::authorize('role_access');
        $roles = Role::with('permissions')->get();
        return Inertia::render('Roles/Index', [
            'roles' => RoleControllerResource::collection($roles),
        ]);
    }

    public function create()
    {
        Gate::authorize('role_create');

        $permissions = Permission::all();
        return Inertia::render('Roles/Create', [
            'permissions' => PersmissionControllerResource::collection($permissions),
        ]);
    }

    public function store(StoreRoleRequest $request){
        Gate::authorize('role_store');

        $permissions = collect($request->selectedPermission)->map(function($permissions){
            return $permissions['value'];
        });

      
        $role = Role::create($request->validated());

        $role->permissions()->sync($permissions);
        return redirect()->route('roles.index')->with('message', [
            'type'=>'success', 
            'body'=>'Role created successfully.']);
    }

     public function edit(Role $role){
        Gate::authorize('role_edit');
        $permissions = Permission::all();
        return Inertia::render('Roles/Edit',[
            'role' => RoleControllerResource::make($role->load('permissions')),
            'permissions' => PersmissionControllerResource::collection($permissions),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role){
        Gate::authorize('role_update');
        $role->update($request->validated());
        $permissions = collect($request->selectedPermission)->map(function($permissions){
            return $permissions['value'];
        });

        $role->permissions()->sync($permissions);

        return redirect()->route('roles.index')->with('message', [
            'type'=>'success', 
            'body'=>'Role updated successfully.']);
    }

    public function destroy(Role $role)
    {
        Gate::authorize('role_delete');
        $role->delete();

        return redirect()->route('roles.index')->with('message', [
            'type'=>'success', 
            'body'=>'Role deleted successfully.']);
    }
}
