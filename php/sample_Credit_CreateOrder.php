<?php
/**
*    Credit信用卡付款產生訂單範例
*/
    
    //載入SDK(路徑可依系統規劃自行調整)
    include('ECPay.Payment.Integration.php');
try {
   $obj = $this->ecpay_library->load(); //用前述建立的library來取得ECPay_AllInOne物件
   //服務參數，最重要的是前四項，正式刷卡與測試刷卡時使用的服務位置會不同，後續三個參數是當你已經向綠界申請好會員後，可以在會員管理後台找到的自己的商店代號
   $obj->ServiceURL  = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";   //服務位置
   $obj->HashKey     = "5294y06JbISpM5x9"; //測試用Hashkey，請自行帶入ECPay提供的HashKey
   $obj->HashIV      = "v77hoKGq4kWxNNIS"; //測試用HashIV，請自行帶入ECPay提供的HashIV
   $obj->MerchantID  = "2000132";   //測試用MerchantID，請自行帶入ECPay提供的MerchantID
   $obj->EncryptType = "1";    //CheckMacValue加密類型，請固定填入1，使用SHA256加密
 
   //基本參數(請依系統規劃自行調整)
   $MerchantTradeNo = "TNO".time() ; //付款的訂單編號，這邊用時間戳記來當作編號，避免重複
   $obj->Send['ReturnURL']         = "https://mysite.com.tw/pageB";    //付款完成通知回傳的網址(頁面B)
   $obj->Send['ClientBackURL']     = "https://tibamef2e.com/tfd105/g1/index.html";    //提供一個可以連回網站頁面的按鈕(頁面D)
   $obj->Send['MerchantTradeNo']   = $MerchantTradeNo;      //訂單編號
   $obj->Send['MerchantTradeDate'] = date('Y/m/d H:i:s');   //交易時間
   $obj->Send['TotalAmount']       = 400;    //交易金額，刷卡時需付款的實際金額數值
   $obj->Send['TradeDesc']         = "這是一筆測試交易" ;                          //交易描述
                     
   switch($pay_way){ //你可以用一個參數來決定客戶是用什麼方式付款
       case "Credit":
           $obj->Send['ChoosePayment'] = ECPay_PaymentMethod::Credit ; //付款方式:Credit
           $obj->Send['OrderResultURL']= "https://mysite.com.tw/pageC"; //付款完成通知回傳的網址，客戶會被導回此頁面(頁面C)
           break;
       case "ATM": 
           $obj->Send['ChoosePayment'] = ECPay_PaymentMethod::ATM ; //付款方式:ATM
           $obj->Send['ExpireDate']    = 3; //用ATM付款的話，可以設定要求客戶要在幾天內完成付款
           //$obj->Send['ClientBackURL'] = "https://mysite.com.tw/pageC"; //付款完成通知回傳的網址，客戶會被導回此頁面(頁面C)
           break;
   }
                                  
            $obj->Send['IgnorePayment']     = ECPay_PaymentMethod::GooglePay ; //不使用付款方式:GooglePay
            //可以傳遞一些自己的資訊給綠界，這些資訊會被記錄在刷卡紀錄中，最多可以傳遞4個自定義參數，但參數的key值不能自訂，算是有點不方便
            $obj->Send['CustomField1']      = "AAAAAAAAAAAAA";  
            $obj->Send['CustomField2']      = "BBBBBBBBBBBBB";  
                     
     //訂單的商品資料，資料來源就是頁面A的表單傳遞給後端的POST資料，把這些資料再傳給綠界，就會在刷卡頁面中呈現給客戶看
     //其實這邊的資料主要只有訊息呈現，以及產生發票時會用到，對於刷卡金額及流程都不會有任何影響
     array_push($obj->Send['Items'], 
         array('Name' => "烤餅乾1", 'Price' => (int)"100", 'Currency' => "元", 'Quantity' => (int) "2", 'URL' => "dedwed"), 
         array('Name' => "烤餅乾2", 'Price' => (int)"200", 'Currency' => "元", 'Quantity' => (int) "1", 'URL' => "dedwed")
     );
  
     //Credit信用卡分期付款延伸參數(可依系統需求選擇是否代入)
     //以下參數不可以跟信用卡定期定額參數一起設定
     $obj->SendExtend['CreditInstallment'] = '' ;    //分期期數，預設0(不分期)，信用卡分期可用參數為:3,6,12,18,24
     $obj->SendExtend['InstallmentAmount'] = 0 ;    //使用刷卡分期的付款金額，預設0(不分期)
     $obj->SendExtend['Redeem'] = false ;           //是否使用紅利折抵，預設false
     $obj->SendExtend['UnionPay'] = false;          //是否為聯營卡，預設false;
     //Credit信用卡定期定額付款延伸參數(可依系統需求選擇是否代入)
     //以下參數不可以跟信用卡分期付款參數一起設定
     // $obj->SendExtend['PeriodAmount'] = '' ;    //每次授權金額，預設空字串
     // $obj->SendExtend['PeriodType']   = '' ;    //週期種類，預設空字串
     // $obj->SendExtend['Frequency']    = '' ;    //執行頻率，預設空字串
     // $obj->SendExtend['ExecTimes']    = '' ;    //執行次數，預設空字串
         
     # 電子發票參數
     /*
     $obj->Send['InvoiceMark'] = ECPay_InvoiceState::Yes;
     $obj->SendExtend['RelateNumber'] = "Test".time();
     $obj->SendExtend['CustomerEmail'] = 'test@ecpay.com.tw';
     $obj->SendExtend['CustomerPhone'] = '0911222333';
     $obj->SendExtend['TaxType'] = ECPay_TaxType::Dutiable;
     $obj->SendExtend['CustomerAddr'] = '台北市南港區三重路19-2號5樓D棟';
     $obj->SendExtend['InvoiceItems'] = array();
     // 將商品加入電子發票商品列表陣列
     foreach ($obj->Send['Items'] as $info)
     {
        array_push($obj->SendExtend['InvoiceItems'],array('Name' => $info['Name'],'Count' =>
          $info['Quantity'],'Word' => '個','Price' => $info['Price'],'TaxType' => ECPay_TaxType::Dutiable));
     }
        $obj->SendExtend['InvoiceRemark'] = '測試發票備註';
        $obj->SendExtend['DelayDay'] = '0';
        $obj->SendExtend['InvType'] = ECPay_InvType::General;
     */
     //產生訂單(auto submit至ECPay)，此步驟會將前述設定的所有參數都一併傳給綠界，並將客戶導到綠界的刷卡頁面
     $obj->CheckOut();
     
} catch (Exception $e) {
   echo $e->getMessage();
} 


 
?>