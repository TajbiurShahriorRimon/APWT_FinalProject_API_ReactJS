<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class org extends Model
{
    //use HasFactory;
    protected $table = 'org';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
