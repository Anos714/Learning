export const welcomeTemplate = (username: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Preview - Anos Solutions</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Email client safe styles simulated here */
        .email-body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f9;
            margin: 0;
            padding: 20px 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .email-header {
            background-color: #2563eb;
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }
        .email-content {
            padding: 40px 30px;
            line-height: 1.6;
            color: #334155;
        }
        .email-btn {
            display: inline-block;
            padding: 14px 28px;
            background-color: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 25px 0;
            transition: background-color 0.2s;
        }
        .email-btn:hover {
            background-color: #1d4ed8;
        }
        .email-footer {
            background-color: #f8fafc;
            padding: 30px 20px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        .social-link {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
        }
    </style>
</head>
<body class="bg-gray-200 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
       

        <!-- The Actual Email Rendering -->
        <div class="email-body rounded-lg">
            <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                    <h1 style="margin:0; font-size: 32px;">Anos Solutions</h1>
                </div>

                <!-- Content -->
                <div class="email-content">
                    <h2 style="font-size: 24px; margin-bottom: 20px;">Namaste Rahul!</h2>
                    <p>Humein bahut khushi hai ki aapne <strong>Anos Solutions</strong> ko chuna. Hum innovative solutions ke saath aapki journey ko behtar banane ke liye committed hain.</p>
                    
                    <p>Aapka account ab puri tarah se active hai. Aap niche diye gaye button par click karke apna dashboard explore kar sakte hain:</p>
                    
                    <div style="text-align: center;">
                        <a href="#" class="email-btn">Get Started Now</a>
                    </div>

                    <p style="margin-top: 30px;">Agar aapko koi bhi sawal ho, toh bas is email ka reply karein. Humari team hamesha aapki madad ke liye taiyar hai.</p>
                    
                    <p style="margin-top: 25px;">Shukriya,<br><span style="color: #2563eb; font-weight: bold;">Team Anos Solutions</span></p>
                </div>

                <!-- Footer -->
                <div class="email-footer">
                    <div style="margin-bottom: 15px;">
                        <a href="#" class="social-link">LinkedIn</a> &nbsp;|&nbsp; 
                        <a href="#" class="social-link">Twitter</a> &nbsp;|&nbsp; 
                        <a href="#" class="social-link">Website</a>
                    </div>
                    <p style="margin: 5px 0;">&copy; 2024 Anos Solutions. All rights reserved.</p>
                    <p style="margin: 0;">123 Tech Park, Digital City, India</p>
                </div>
            </div>
        </div>

        <!-- Mobile Simulation Hint -->
        <p class="text-center text-gray-500 text-xs mt-6 italic">
            Note: This is a web-based preview. Real email clients (Gmail, Outlook) may vary slightly.
        </p>
    </div>
</body>
</html>`;
};
