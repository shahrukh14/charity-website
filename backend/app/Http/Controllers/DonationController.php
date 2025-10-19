<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Razorpay\Api\Api;
use App\Models\Donation;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;


class DonationController extends Controller
{
    public function donation(Request $request){
        try {
            $data = $request->all();
            $api  = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

            //Create Certificate Number
            $thisYear = Carbon::now()->format('Y');
            $nextYear = Carbon::now()->addYear(1)->format('Y');
            $lastReccord = Donation::orderBy('id', 'DESC')->first();
            if($lastReccord){
                $explode =  explode("-", $lastReccord->certificate_number);
                $slNo = (int)$explode[3] + 1;
            }else{
                $slNo = '1000';
            }
            $certificate_number = 'MCF-'. $thisYear .'-'. $nextYear.'-'.$slNo;

            // Create Razorpay Order
            $order = $api->order->create([
                'receipt'         => $certificate_number,
                'amount'          => $data['amount'] * 100, // Razorpay uses paise
                'currency'        => 'INR',
                'payment_capture' => 1 // auto capture
            ]);

            //Image upload
            $folder_path = public_path('pancards/');
            if (!File::exists($folder_path)) {
                File::makeDirectory($folder_path, 0777, true, true);
            }
            if ($request->pan_image){
                $pan_image =  date('Ymd').'_'.rand().'.'.$request->pan_image->getClientOriginalExtension();
                $request->pan_image->move($folder_path, $pan_image);
            } else {
                $pan_image = NULL;
            }

            //Store Doner Details
            $donation                       = new Donation();
            $donation->event_id             = $request->event_id;
            $donation->certificate_number   = $certificate_number;
            $donation->donor_name           = $request->name;
            $donation->email                = $request->email;
            $donation->mobile               = $request->mobile;
            $donation->pan_number           = $request->pan;
            $donation->pan_image            = $pan_image;
            $donation->amount               = $request->amount;
            $donation->address              = $request->address;
            $donation->save();

            return response()->json([
                'success'       => true,
                'order_id'      => $order['id'],
                'razorpay_key'  => env('RAZORPAY_KEY'),
                'amount'        => $order['amount'],
                'donation_id'   => $donation->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success'   => false,
                'message'   => 'Something went wrong during payment initialization.',
                'error'     => $e->getMessage()
            ], 500);
        }
    }

    public function verifyPayment(Request $request){
        try {
            $api = new \Razorpay\Api\Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
            $attributes = [
                'razorpay_order_id'     => $request->razorpay_order_id,
                'razorpay_payment_id'   => $request->razorpay_payment_id,
                'razorpay_signature'    => $request->razorpay_signature
            ];
            //Payment signature verify
            $api->utility->verifyPaymentSignature($attributes);

            //Fetch Payment Details from Razorpay API
            $payment = $api->payment->fetch($request->razorpay_payment_id);

            //Save Transaction into table
            $transaction                    = new Transaction();
            $transaction->donation_id       = $request->donation_id;
            $transaction->payment_id        = $request->razorpay_payment_id;
            $transaction->order_id          = $request->razorpay_order_id;
            $transaction->signature         = $request->razorpay_signature;
            $transaction->amount            = $payment->amount / 100; // convert from paisa to rupees
            $transaction->currency          = $payment->currency;
            $transaction->save();

            //Update payment status
            $donation = Donation::find($request->donation_id);
            $donation->payment_status = 1;
            $donation->save();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Signature verification failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function certificate($id){
        $donation =  Donation::find($id);
        $fileName = $donation->certificate_number.".pdf";
        $pdf = Pdf::loadView('certificate', compact('donation'));
        return $pdf->download($fileName);
    }

}
