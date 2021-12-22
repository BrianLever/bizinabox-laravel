<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GettingStartedController extends UserController
{
    public function index()
    {
        if(user()->started==1) return redirect()->route('user.todo.index');
        return view(self::$viewDir.'started.index');
    }
    public function username(Request $request)
    {
        try {
            $validation = \Validator::make($request->all(), [
                'username'=>'required|min:4|unique:users,username,'.user()->id,
                'pin_number'=>'required|string|min:4|max:7|unique:users,pin_number,'.user()->id,
            ]);
            if($validation->fails()) return $this->jsonError($validation->errors());

            user()->username = $request->username;
            user()->pin_number = $request->pin_number;
            user()->save();

            return $this->jsonSuccess(user()->getCompletedPercentage());

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function demographics(Request $request)
    {
        try {
            $validation = \Validator::make($request->all(), [
                'first_name'=>'required|string|max:45',
                'last_name'=>'required|string|max:45',
                'date_of_birth'=>'required|date_format:Y-m-d|before:today',
                'phone'=>'required|min:5|max:15',
                'address1'=>'required|max:191',
                'address2'=>'nullable|max:191',
                'city'=>'required|max:191',
                'state'=>'required|max:191',
                'zipcode'=>'required|postal_code:' . $request->country,
                'country'=>'required|exists:mysql2.country,iso',
            ]);

            if($validation->fails()) return $this->jsonError($validation->errors());

            user()->first_name = $request->first_name;
            user()->last_name = $request->last_name;
            user()->birthday = $request->date_of_birth;
            user()->save();

            $address = user()->address;
            $address->first_name = $request->first_name;
            $address->last_name = $request->last_name;
            $address->address1 = $request->address1;
            $address->address2 = $request->address2;
            $address->city = $request->city;
            $address->state = $request->state;
            $address->zipcode = $request->zipcode;
            $address->country = $request->country;
            $address->phone = $request->phone;
            $address->save();

            return $this->jsonSuccess(user()->getCompletedPercentage());

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function time(Request $request)
    {
        try {
            $validation = \Validator::make($request->all(), [
                'timezone'=>'required|max:191',
                'timeformat'=>'required|max:191'
            ]);
            if($validation->fails()) return $this->jsonError($validation->errors());

            user()->timezone = $request->timezone;
            user()->timeformat = $request->timeformat;
            user()->save();

            return $this->jsonSuccess(user()->getCompletedPercentage());

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function complete()
    {
        if(user()->getCompletedPercentage()==100&&user()->started==0)
        {
            user()->started=1;
            user()->save();
            return redirect()->route("user.todo.index")->with("success", "Success!");
        }
        return back();
    }
}
