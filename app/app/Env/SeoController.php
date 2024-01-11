<?php 

    namespace App\Env;
    use App\Models\Seo;
class SeoController {
    public static function createSeoData(String $type, $id, $data){
        $seo = new Seo();
        $seo->taxonomy_id = $id;
        $seo->meta_title = $data->meta_title;
        $seo->type = $type;
        $seo->meta_description = $data->meta_description;
        if(is_array($data->meta_keywords)){
            $string_keywords = '';
            foreach($data->meta_keywords as $key => $keyword){
                if($key == array_key_first($data->meta_keywords)){
                    $string_keywords = $keyword;
                }else{
                    $string_keywords = $string_keywords . ',' . $keyword;
                }
            }
            $seo->meta_keywords = $string_keywords;
        }else{
            $seo->meta_keywords = $data->meta_keywords;
        }
        return $seo->save();
    }

}