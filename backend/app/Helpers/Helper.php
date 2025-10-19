<?php 


//String Format Function
function formatString($string){
    $string = trim($string, '/');

    // Replace special characters (., _, -) and slashes with a space
    $string = preg_replace('/[._\-\/]+/', ' ', $string);

    // Capitalize each word
    $formattedString = ucwords($string);

    // Remove the first word
    $formattedString = preg_replace('/^\w+\s/', '', $formattedString);

    return $formattedString;
}

//Convert Numbers in to words
function amountInWords($number) {
    $no = floor($number);
    $point = round($number - $no, 2) * 100;
    $hundred = null;
    $digits_1 = strlen($no);
    $i = 0;
    $str = array();
    $words = array(
        '0' => '', '1' => 'One', '2' => 'Two', '3' => 'Three', '4' => 'Four',
        '5' => 'Five', '6' => 'Six', '7' => 'Seven', '8' => 'Eight', '9' => 'Nine',
        '10' => 'Ten', '11' => 'Eleven', '12' => 'Twelve', '13' => 'Thirteen',
        '14' => 'Fourteen', '15' => 'Fifteen', '16' => 'Sixteen', '17' => 'Seventeen',
        '18' => 'Eighteen', '19' => 'Nineteen', '20' => 'Twenty', '30' => 'Thirty',
        '40' => 'Forty', '50' => 'Fifty', '60' => 'Sixty', '70' => 'Seventy',
        '80' => 'Eighty', '90' => 'Ninety'
    );
    
    $digits = array('', 'Hundred', 'Thousand', 'Lakh', 'Crore');
    
    while ($i < $digits_1) {
        $divider = ($i == 2) ? 10 : 100;
        $number = floor($no % $divider);
        $no = floor($no / $divider);
        $i += ($divider == 10) ? 1 : 2;
        
        if ($number) {
            $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
            $hundred = ($counter == 1 && $str[0]) ? ' And ' : null;
            $str[] = ($number < 21) ? $words[$number] . ' ' . $digits[$counter] . $plural . ' ' . $hundred : 
                $words[floor($number / 10) * 10] . ' ' . $words[$number % 10] . ' ' . $digits[$counter] . $plural . ' ' . $hundred;
        } else {
            $str[] = null;
        }
    }
    
    $str = array_reverse($str);
    $result = implode('', $str);
    $points = ($point) ? $words[$point / 10] . ' ' . $words[$point % 10] : '';
    
    $result = ucfirst(trim($result)) . ' Rupees';
    if ($point > 0) {
        $result .= ' And ' . ucfirst(trim($points)) . ' Paise';
    }
    
    return $result . ' Only';
}