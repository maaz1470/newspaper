<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AuthVerification;
use App\Models\Auth;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function registration(Request $request){
        $validator = Validator::make($request->all(),[
            'firstName' => 'required|string|max:255',
            'lastName'  => 'required|string|max:255',
            'username'  => 'required|string|max:255|unique:auths,username',
            'email'     => 'required|email|max:255|unique:auths,email',
            'password'  => 'required|min:6|max:50'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $auth = new Auth();
        $auth->first_name = $request->firstName;
        $auth->last_name = $request->lastName;
        $auth->username = $request->username;
        $auth->email = $request->email;
        $auth->password = Hash::make($request->password);

        if($auth->save()){
            Mail::to($auth->email)->send(new AuthVerification($request->firstName));
            return Response()->json([
                'status'    => 200,
                'message'   => 'User registration successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 402,
                'message'   => 'User Registration Failed'
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'username'  => 'required|string|max:255',
            'password'     => 'required|string|max:255'
        ]);
        
        if($validator->fails()){
            return Response()->json([
                'status'   => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $user = Auth::where('username',$request->username)->get()->first();
        if($user){
            if(Hash::check($request->password,$user->password)){
                $token = $user->createToken($request->username);
                return Response()->json([
                    'status'    => 200,
                    'token'     => $token->plainTextToken,
                    'message'   => 'You are authorized successfully.'
                ]);
            }else{
                return Response()->json([
                    'status'    => 402,
                    'message'   => 'Username or Password not matched.'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 402,
                'message'   => 'Username or Password not matched.'
            ]);
        }

    }
}
