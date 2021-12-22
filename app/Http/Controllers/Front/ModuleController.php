<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Integration\Cart;
use App\Integration\Paypal;
use App\Models\Module;
use App\Models\ModuleCategory;
use Illuminate\Http\Request;
use Validator;
use Session;

class ModuleController extends Controller
{
    public $model;

    public function __construct()
    {
        $this->model = new Module();
    }
    public function index(Request $request)
    {
        if($request->ajax())
        {
            $result = $this->model->filterItem($request);
            return response()->json($result);
        }

        $categories = ModuleCategory::select('id', 'slug', 'name', 'parent_id')
            ->with('approvedSubCategories')
            ->isParent()
            ->status(1)
            ->orderBy('order')
            ->get();
        return view('frontend.module.index', compact('categories'));
    }
    public function detail($slug)
    {
        $item = $this->model->where('slug', $slug)
            ->with('media', 'prices')
            ->status(1)
            ->firstorfail();
        return view('frontend.module.detail', compact('item'));
    }
    public function cartRule()
    {
        $rule['quantity'] = 'required|numeric|min:1';
        $rule['price'] = 'required';
        return $rule;
    }

    public function addtoCart(Request $request, $id)
    {
        try {
                $item = $this->model->whereId($id)
                    ->whereStatus(1)
                    ->firstorfail();
                $slug = $item->slug;
                $module_wishes = session("module_wishes", []);
                if(!in_array($slug, $module_wishes))
                {
                    array_push($module_wishes, $slug);
                    session()->put("module_wishes", $module_wishes);
                }
                return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
//    public function addtoCart(Request $request, $id)
//    {
//        try {
//
//            $validation = Validator::make($request->all(), $this->cartRule());
//            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);
//            $item = $this->model->whereId($id)
//                ->whereStatus(1)
//                ->firstorfail();
//            if($request->price==0)
//            {
//                $price = $item->standardPrice;
//            }else {
//                $price = $item->prices()
//                    ->whereStatus(1)
//                    ->whereId($request->price)
//                    ->firstorfail();
//            }
//           $oldCart = Session::get("cart");
//           $cart = new Cart($oldCart);
//
//           $cart->add($item, route('module.detail', $item->slug), $request->quantity, $price->price, 'module', $item->getFirstMediaUrl("thumbnail"), $price->recurrent, $item->name, $price);
//
//           Session::put("cart", $cart);
//
//           return response()->json([
//                'status'=>1,
//               'data'=>view('components.front.cart')->render()
//           ]);
//        }catch(\Exception $e)
//        {
//            return response()->json([
//                'status'=>0,
//                'data'=>['Item not found!']
//            ]);
//        }
//    }
    public function ttt()
    {
//        $item = $this->model->with('standardPrice')->where('slug', "portfolio")
//            ->status(1)
//            ->firstorfail();
//
//        $paypal = new Paypal();
//        $provider = $paypal->getProvider();
//        $data = [];
//        $data['items'] = [
//            [
//                'name' => $item->name . ", $". formatNumber($item->standardPrice->price) ."/" . periodName($item->standardPrice->period, $item->standardPrice->period_unit),
//                'price' => $item->standardPrice->price,
//                'desc'  => $item->description,
//                'qty' => 1
//            ],
//        ];
//        $data['invoice_id'] = 4;
//        $data['invoice_description'] = "Order #{$data['invoice_id']} Invoice";
//        $data['return_url'] = route('cart.paypal.execute');
//        $data['cancel_url'] = route('cart.index');
//        $total = 0;
//        foreach($data['items'] as $item_detail) {
//            $total += $item_detail['price']*$item_detail['qty'];
//        }
//        $data['total'] = $total;
//
//        $response = $provider->setExpressCheckout($data, true);
//        return redirect($response['paypal_link']);
    }
}
