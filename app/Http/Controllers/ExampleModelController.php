<?php

namespace App\Http\Controllers;

use App\Models\ExampleModel;
use Illuminate\Http\Request;

class ExampleModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        dd(ExampleModel::index());
    }

    // Request is always available in a controller function. $id must match a route parameter
    public function get(Request $request, int $id)
    {
        dd(ExampleModel::get($id));
    }

    public function update(Request $request, int $id)
    {
        $obj = ExampleModel::get($id);
        $obj->test3 = 'updated';
        $obj = $obj->save($request->user()->id);
        dd($obj);
    }
}
