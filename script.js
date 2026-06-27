const popup =
document.getElementById("popup");

const continueBtn =
document.getElementById("continueBtn");

const wheel =
document.getElementById("wheel");

const spinBtn =
document.getElementById("spinBtn");

const resultPopup =
document.getElementById("resultPopup");

const giftText =
document.getElementById("giftText");

const closeResult =
document.getElementById("closeResult");

let currentRotation = 0;

let user = {};

/* --------------------------
   ПОПАП С ДАННЫМИ
--------------------------- */

continueBtn.onclick = () => {

    const firstName =
    document.getElementById("firstName").value.trim();

    const lastName =
    document.getElementById("lastName").value.trim();

    const email =
    document.getElementById("email").value.trim();

    if (!firstName || !lastName || !email) {

        alert("Заполните все поля");
        return;
    }

    user = {
        firstName,
        lastName,
        email
    };

    popup.style.display = "none";
};

/* --------------------------
   УНИКАЛЬНЫЕ НОМЕРА 1-40
--------------------------- */

const availableNumbers =
Array.from(
    { length: 40 },
    (_, i) => i + 1
);

function getGift() {

    if (availableNumbers.length === 0) {
        return null;
    }

    const randomIndex =
    Math.floor(
        Math.random() *
        availableNumbers.length
    );

    const giftNumber =
    availableNumbers[randomIndex];

    availableNumbers.splice(
        randomIndex,
        1
    );

    return giftNumber;
}

/* --------------------------
   ВРАЩЕНИЕ КОЛЕСА
--------------------------- */

function spinWheel() {

    currentRotation +=
    1800 +
    Math.random() * 360;

    wheel.style.transition =
    "transform 5s ease-out";

    wheel.style.transform =
    `rotate(${currentRotation}deg)`;
}

/* --------------------------
   КНОПКА ПОЛУЧИТЬ ПОДАРОК
--------------------------- */

spinBtn.onclick = () => {

    const gift =
    getGift();

    if (!gift) {

        alert(
            "Все номера уже выданы"
        );

        return;
    }

    spinBtn.disabled = true;

    spinWheel();

    setTimeout(() => {

        giftText.innerHTML =
        `Ваш номер подарка <strong>№${gift}</strong>`;

        resultPopup.classList.remove(
            "hidden"
        );

        spinBtn.disabled = false;

        console.log({
            name: user.firstName,
            surname: user.lastName,
            email: user.email,
            gift: gift
        });

    }, 5000);
};

/* --------------------------
   ЗАКРЫТЬ РЕЗУЛЬТАТ
--------------------------- */

closeResult.onclick = () => {

    resultPopup.classList.add(
        "hidden"
    );
};