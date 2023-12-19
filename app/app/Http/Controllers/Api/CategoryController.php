<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    protected function createCategoryURL($name){
        return $name;
    }

    public function add(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255',
            'status'    => 'required'
        ]);

        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $url = $this->createCategoryURL($request->name);

        $category = new Category;
        $category->name = $request->name;
        $category->url = $url;
        $category->status = $request->status;
        
    }
}
