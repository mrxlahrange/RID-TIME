 const addTodayBtn = document.getElementById('addToday');
        const addDateBtn = document.getElementById('addDate');
        const clearAllBtn = document.getElementById('clearAll');
        const dateList = document.getElementById('dateList');
        const datePicker = document.getElementById('datePicker');

        // تحميل التواريخ من localStorage
        window.onload = () => {
            const savedDates = JSON.parse(localStorage.getItem('dates')) || [];
            savedDates.forEach(date => addDateToList(date));
        };

        // إضافة تاريخ إلى القائمة والتخزين المحلي
        function addDateToList(date) {
            const li = document.createElement('li');
            li.textContent = date;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.addEventListener('click', () => {
                li.remove();
                removeDateFromStorage(date);
            });

            li.appendChild(deleteBtn);
            dateList.appendChild(li);
        }

        // إضافة تاريخ اليوم
        addTodayBtn.addEventListener('click', () => {
            const today = new Date().toISOString().split('T')[0];
            if (!isDateInStorage(today)) {
                saveDateToStorage(today);
                addDateToList(today);
            }
        });
        // إضافة تاريخ من المربع
        addDateBtn.addEventListener('click', () => {
            const selectedDate = datePicker.value; // قراءة التاريخ المختار
            if (selectedDate) { // التأكد من وجود قيمة مختارة
                if (!isDateInStorage(selectedDate)) {
                    saveDateToStorage(selectedDate);
                    addDateToList(selectedDate);
                } else {
                    alert("التاريخ موجود بالفعل!");
                }
            } else {
                alert("يرجى اختيار تاريخ أولاً!"); // رسالة تنبيه عند عدم اختيار تاريخ
            }
        });
        // إضافة تاريخ من المربع

        // حذف جميع التواريخ
        clearAllBtn.addEventListener('click', () => {
            localStorage.removeItem('dates');
            dateList.innerHTML = '';
        });

        // تخزين تاريخ في localStorage
        function saveDateToStorage(date) {
            const dates = JSON.parse(localStorage.getItem('dates')) || [];
            dates.push(date);
            localStorage.setItem('dates', JSON.stringify(dates));
        }

        // إزالة تاريخ من localStorage
        function removeDateFromStorage(date) {
            let dates = JSON.parse(localStorage.getItem('dates')) || [];
            dates = dates.filter(d => d !== date);
            localStorage.setItem('dates', JSON.stringify(dates));
        }

        // التحقق إذا كان التاريخ موجودًا في التخزين
        function isDateInStorage(date) {
            const dates = JSON.parse(localStorage.getItem('dates')) || [];
            return dates.includes(date);
        }
