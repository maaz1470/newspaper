<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Env\SeoController;
class CategoryController extends Controller
{

    protected function createCategoryURL($name){
        $slug = preg_replace("/-$/","",preg_replace('/[^a-z0-9]+/i', "-", strtolower($name)));
        $category = Category::where('url',$slug)->get();
        $allCategories = Category::all();
        if($category->count() > 0){
            $slug = $slug . '-' . $allCategories->count();
        }
        return $slug;
    }

    public function add(Request $request){
        $validator = Validator::make($request->all(),[
            'name'      => 'required|string|max:255',
            'status'    => 'required',
            'meta_title'=> 'required|string|max:255'
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
        if($category->save()){
            $id = $category->id;
            SeoController::createSeoData('category',$id,$request);
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category create successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 402,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }

    public function all($currentPage, $showPerPage){
        // $categories = Category::all();
        // if($categories){
        //     return Response()->json([
        //         'status'    => 200,
        //         'categories'    => $categories
        //     ]);
        // }
        return Response()->json([$currentPage, $showPerPage]);
    }
}
