// تابع برای ایجاد iframe جدید  
function createIframe() {  
    // دریافت URL وارد شده توسط کاربر  
    const urlInput = document.getElementById("siteURL").value.trim();  

    // بررسی اینکه URL شروع به http:// یا https:// دارد یا خیر  
    let url = urlInput; // ابتدا URL را به یک متغیر جدید نسبت می‌دهیم  
    if (!url.startsWith("http://") && !url.startsWith("https://")) {  
        url = "https://" + url; // افزودن https:// اگر وجود نداشته باشد  
    }  

    // ایجاد یک div جدید برای محاط کردن iframe  
    const wrapperDiv = document.createElement("div");  
    wrapperDiv.className = "iframeWrapper";  

    // ایجاد iframe و تنظیم URL آن  
    const iframe = document.createElement("iframe");  
    iframe.src = url; // تنظیم منبع iframe  
    iframe.style.height = "600px"; // ارتفاع پیش‌فرض iframe  
    iframe.style.width = "100%"; // عرض iframe  

    // ایجاد دکمه برای حالت تمام صفحه  
    const fullscreenButton = document.createElement("button");  
    fullscreenButton.textContent = "[ ]";  
    fullscreenButton.style.marginTop = "5px";  
    fullscreenButton.style.width = "20%";  

    // تنظیم عملکرد دکمه حالت تمام صفحه  
    fullscreenButton.onclick = function () {  
        if (!document.fullscreenElement) {  
            // درخواست ورود به حالت تمام صفحه  
            wrapperDiv.requestFullscreen().catch((err) => {  
                console.error(  
                    `خطا در درخواست حالت تمام صفحه: ${err.message} (${err.name})`  
                );  
            });  
        } else {  
            // خروج از حالت تمام صفحه  
            document.exitFullscreen();  
        }  
    };  

    // ایجاد دکمه برای حذف iframe  
    const deleteButton = document.createElement("button");  
    deleteButton.textContent = "🗑";  
    deleteButton.style.marginTop = "5px";  
    deleteButton.style.fontSize = "20px";  

    // تنظیم عملکرد دکمه حذف  
    deleteButton.onclick = function () {  
        wrapperDiv.remove(); // حذف div محاط کننده iframe  
    };  

    // افزودن iframe و دکمه‌ها به div محاط‌کننده  
    wrapperDiv.appendChild(iframe);  
    wrapperDiv.appendChild(fullscreenButton);  
    wrapperDiv.appendChild(deleteButton);  

    // افزودن div محاط کننده به контейینر اصلی  
    const container = document.getElementById("iframeContainer");  
    container.appendChild(wrapperDiv);  

    // خالی کردن ورودی URL پس از ایجاد iframe  
    document.getElementById("siteURL").value = "";  

    // اضافه کردن شنونده به رویداد تغییر حالت تمام صفحه  
    document.addEventListener("fullscreenchange", () => {  
        if (document.fullscreenElement) {  
            // تغییر ارتفاع iframe در حالت تمام صفحه  
            iframe.style.height = "100vh";  
            fullscreenButton.style.display = "none"; // پنهان کردن دکمه حالت تمام صفحه  
            deleteButton.style.display = "none"; // پنهان کردن دکمه حذف  
        } else {  
            // تنظیم ارتفاع iframe به حالت عادی  
            iframe.style.height = "600px";  
            fullscreenButton.style.display = "block"; // نمایش دکمه حالت تمام صفحه  
            deleteButton.style.display = "block"; // نمایش دکمه حذف  
        }  
    });  
}  

// تابع برای تغییر تم  
function toggleTheme() {  
    const body = document.body; // دریافت بدنه سند  
    const button = document.getElementById("themeToggle"); // دریافت دکمه تغییر تم  

    // تغییر کلاس بدنه و دکمه برای تغییر تم  
    body.classList.toggle("dark-mode");  
    button.classList.toggle("dark-mode");  

    // تغییر متن دکمه بر اساس حالت فعلی تم  
    if (body.classList.contains("dark-mode")) {  
        button.textContent = "لایت مود"; // اگر در حالت تاریک هستیم  
    } else {  
        button.textContent = "دارک مود"; // اگر در حالت روشن هستیم  
    }  
}  

// افزودن شنونده رویداد برای ورودی URL  
document.getElementById("siteURL").addEventListener("keydown", function(event) {  
    // بررسی اینکه آیا کلید فشرده شده Enter است یا خیر  
    if (event.key === "Enter") {  
        createIframe(); // ایجاد iframe جدید در صورت فشردن Enter  
        event.preventDefault(); // جلوگیری از عملیات پیش‌فرض در صورت نیاز  
    }  
});
