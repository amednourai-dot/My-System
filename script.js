const input = document.getElementById("numberInput");
const buttons = document.querySelectorAll(".system");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const error = document.getElementById("error");

const binary = document.getElementById("binary");
const decimal = document.getElementById("decimal");
const octal = document.getElementById("octal");
const hexadecimal = document.getElementById("hexadecimal");

let selectedBase = 2;

buttons.forEach(button => {
button.addEventListener("click", () => {
buttons.forEach(btn => btn.classList.remove("active"));
button.classList.add("active");
selectedBase = Number(button.dataset.base);
input.focus();
});
});

function convertNumber() {
const value = input.value.trim().toUpperCase();

error.textContent = "";

if (!value) {
    error.textContent = "أدخل رقمًا أولًا";
    return;
}

const number = parseInt(value, selectedBase);

if (isNaN(number)) {
    error.textContent = "الرقم غير صالح للنظام المحدد";
    return;
}

if (number.toString(selectedBase).toUpperCase() !== value.replace(/^0+/, "") && value !== "0") {
    error.textContent = "الرقم غير صالح للنظام المحدد";
    return;
}

binary.textContent = number.toString(2);
decimal.textContent = number.toString(10);
octal.textContent = number.toString(8);
hexadecimal.textContent = number.toString(16).toUpperCase();

}

convertBtn.addEventListener("click", convertNumber);

input.addEventListener("keydown", event => {
if (event.key === "Enter") {
convertNumber();
}
});

clearBtn.addEventListener("click", () => {
input.value = "";
binary.textContent = "—";
decimal.textContent = "—";
octal.textContent = "—";
hexadecimal.textContent = "—";
error.textContent = "";
input.focus();
});

copyBtn.addEventListener("click", async () => {
const text = "BIN: ${binary.textContent} DEC: ${decimal.textContent} OCT: ${octal.textContent} HEX: ${hexadecimal.textContent}";

if (binary.textContent === "—") {
    error.textContent = "لا توجد نتيجة لنسخها";
    return;
}

try {
    await navigator.clipboard.writeText(text);
    error.style.color = "#2e7d32";
    error.textContent = "تم النسخ";
} catch {
    error.style.color = "#c62828";
    error.textContent = "تعذر النسخ";
}

});
