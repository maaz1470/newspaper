<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Auth extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'auths';
    protected $hidden = ['created_at','updated_at'];
}
