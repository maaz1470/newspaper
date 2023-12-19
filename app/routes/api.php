<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     Route::get('/checkAuth',function(){
//         return 'Hello';
//     }); 
// });

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/checkAuth',function(){
        return Response()->json([
            'status'    => 200,
            'user'      => true
        ]);
    });

    Route::prefix('category')->group(function(){
        Route::name('category.')->group(function(){
            Route::get('/add',[CategoryController::class, 'add'])->name('create');
        });
    });

});


Route::prefix('auth')->group(function(){
    Route::name('auth.')->group(function(){
        Route::post('/registration',[AuthController::class, 'registration'])->name('register');
        Route::post('/login',[AuthController::class, 'login'])->name('login');
    });
});