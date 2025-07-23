<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Enums\UserRole;


class UsuariosController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
    * Store a newly created resource in storage.
    */
    public function store(Request $request)
    {        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:' . implode(',', UserRole::values()),
        ]);

        $data = $request->except('password');
        $data['password'] = \Hash::make($request->password);
        
        User::create( $request->all() );
    }

    
    /**
    * Display the specified resource.
    */
    public function show(User $usuario)
    {
        $usuario->load('sede.ciudad.departamento');
        return response()->json([
            'success' => true,
            'message' => 'OK',
            'data' => $usuario,
        ]);
    }

    /**
    * Update the specified resource in storage.
    */
    public function update(Request $request, User $usuario)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $usuario->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $usuario->update( $request->except('password') );

        if ($request->password) {
            $usuario->update(['password' => \Hash::make($request->password)]);
        }
    }

    /**
    * Remove the specified resource from storage.
    */
    public function destroy(User $usuario)
    {
        $usuario->delete();
    }

    public function sync(Request $request, $id)
    {
        $user = User::find( $id );
        $user->syncPermissions($request->permisos);
        // return new PermisosResource( $permiso );
    }
}
