<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>80G Donation Certificate</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      padding: 40px;
      max-width: 800px;
      margin: auto;
      border: 2px solid #000;
      background: #f9f9f9;
    }
    h1, h2 {
      text-align: center;
      color: #003366;
    }
    .section {
      margin: 20px 0;
    }
    table {
      width: 100%;
    }
    td {
      padding: 8px;
    }
    .footer {
      margin-top: 40px;
      font-size: 0.9em;
      text-align: center;
    }
  </style>
</head>
<body>

  <h1>Donation Receipt under Section 80G</h1>
  <h2>Mamata Care Foundation</h2>

  <div class="section">
    <strong>80G Certificate No:</strong> {{$donation->certificate_number}}<br>
    <strong>Issued U/S:</strong> Section 80G of the Income Tax Act, 1961<br>
    <strong>PAN No:</strong> AARCM7418E
  </div>

  <div class="section">
    <strong>Date:</strong> {{date('d-m-Y',strtotime($donation->created_at))}}
  </div>

  <div class="section">
    <p>This is to certify that we have received a donation from:</p>
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <td><strong>Donor Name:</strong></td>
        <td>{{$donation->donor_name}}</td>
      </tr>
      <tr>
        <td><strong>Address:</strong></td>
        <td>{{$donation->address}}</td>
      </tr>
      <tr>
        <td><strong>PAN No:</strong></td>
        <td>{{$donation->pan_number}}</td>
      </tr>
      <tr>
        <td><strong>Donation Amount:</strong></td>
        <td><span>&#8377;</span> {{number_format($donation->amount, 2)}} /- ({{amountInWords($donation->amount)}})</td>
      </tr>
      <tr>
        <td><strong>Payment Mode:</strong></td>
        <td>Razor Pay</td>
      </tr>
      <tr>
        <td><strong>Purpose:</strong></td>
        <td>Ratha Yatra (Static)</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <p>This donation is eligible for deduction under section 80G of the Income Tax Act, 1961.</p>
  </div>

  <div class="section" style="text-align: right;">
    <p>Authorized Signatory<br> Mamata Care Foundation</p>
  </div>

  <div class="footer">
    L-108, Baramunda Housing Board Colony, Baramunda, Bhubaneswar, Odisha 751003 <br/> Contact: 637022332 | Email: mamatacarefoundation@gmail.com
  </div>

</body>
</html>
