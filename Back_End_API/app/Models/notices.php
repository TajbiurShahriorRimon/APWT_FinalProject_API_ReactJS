<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class notices extends Model
{
    protected $table = 'notifications';
    protected $primaryKey = 'notificationsId';
    public $timestamps = false;
}
